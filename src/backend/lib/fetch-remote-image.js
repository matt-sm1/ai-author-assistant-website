import {
  assertPublicHostname,
  parseHttpsImportUrl,
} from "@/backend/lib/ssrf-url";
import { AppError } from "@/backend/errors/app-error";
import { HTTP_STATUS } from "@/backend/constants/http-status";
import { ERROR_CODES } from "@/backend/constants/error-codes";
import { MEDIA_CONFIG } from "@/backend/constants/media.constants";

const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_REDIRECTS = 3;
const MAX_BYTES = MEDIA_CONFIG.image.maxSize;

function badRequest(message) {
  return new AppError(
    message,
    HTTP_STATUS.BAD_REQUEST,
    ERROR_CODES.VALIDATION_ERROR,
  );
}

/**
 * Fetch a remote HTTPS image with SSRF checks, redirect cap, and size limit.
 * @returns {Promise<{ buffer: Buffer, contentType: string, finalUrl: string }>}
 */
export async function fetchRemoteImage(rawUrl, { timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  let current = parseHttpsImportUrl(rawUrl);

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    await assertPublicHostname(current.hostname);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    let response;
    try {
      response = await fetch(current.toString(), {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          Accept: "image/*,*/*;q=0.8",
          "User-Agent": "AuthorBotMediaImport/1.0",
        },
      });
    } catch (error) {
      if (error?.name === "AbortError") {
        throw badRequest("Timed out fetching remote image");
      }
      throw badRequest("Unable to fetch remote image");
    } finally {
      clearTimeout(timer);
    }

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) {
        throw badRequest("Remote image redirect missing Location");
      }
      if (hop === MAX_REDIRECTS) {
        throw badRequest("Too many redirects fetching remote image");
      }
      try {
        current = parseHttpsImportUrl(new URL(location, current).toString());
      } catch {
        throw badRequest("Invalid redirect URL for remote image");
      }
      continue;
    }

    if (!response.ok) {
      throw badRequest(`Remote image returned HTTP ${response.status}`);
    }

    const contentLength = response.headers.get("content-length");
    if (contentLength != null) {
      const size = Number(contentLength);
      if (Number.isFinite(size) && size > MAX_BYTES) {
        throw badRequest("Remote image exceeds the maximum allowed size");
      }
    }

    const chunks = [];
    let total = 0;
    const reader = response.body?.getReader?.();

    if (!reader) {
      const ab = await response.arrayBuffer();
      if (ab.byteLength > MAX_BYTES) {
        throw badRequest("Remote image exceeds the maximum allowed size");
      }
      return {
        buffer: Buffer.from(ab),
        contentType: response.headers.get("content-type") || "",
        finalUrl: current.toString(),
      };
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        try {
          reader.cancel();
        } catch {
          /* ignore */
        }
        throw badRequest("Remote image exceeds the maximum allowed size");
      }
      chunks.push(Buffer.from(value));
    }

    return {
      buffer: Buffer.concat(chunks),
      contentType: response.headers.get("content-type") || "",
      finalUrl: current.toString(),
    };
  }

  throw badRequest("Unable to fetch remote image");
}
