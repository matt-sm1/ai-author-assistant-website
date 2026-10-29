import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { AppError } from "@/backend/errors/app-error";
import { HTTP_STATUS } from "@/backend/constants/http-status";
import { ERROR_CODES } from "@/backend/constants/error-codes";

/**
 * SSRF guards for server-side URL fetch (media import).
 */

function badRequest(message) {
  return new AppError(
    message,
    HTTP_STATUS.BAD_REQUEST,
    ERROR_CODES.VALIDATION_ERROR,
  );
}

function isPrivateOrReservedIp(ip) {
  const value = String(ip || "").toLowerCase();

  if (value === "127.0.0.1" || value === "::1" || value === "0.0.0.0") {
    return true;
  }

  // IPv4 dotted
  const v4 = value.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (v4) {
    const a = Number(v4[1]);
    const b = Number(v4[2]);
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    if (a >= 224) return true; // multicast / reserved
    return false;
  }

  // IPv6 condensed checks
  if (
    value.startsWith("fc") ||
    value.startsWith("fd") ||
    value.startsWith("fe80") ||
    value === "::" ||
    value.startsWith("::ffff:127.") ||
    value.startsWith("::ffff:10.") ||
    value.startsWith("::ffff:192.168.")
  ) {
    return true;
  }

  return false;
}

/**
 * Validate candidate URL string: https only, no credentials, host required.
 * @returns {URL}
 */
export function parseHttpsImportUrl(raw) {
  let url;
  try {
    url = new URL(String(raw || "").trim());
  } catch {
    throw badRequest("Invalid image URL");
  }

  if (url.protocol !== "https:") {
    throw badRequest("Only HTTPS image URLs are allowed");
  }

  if (url.username || url.password) {
    throw badRequest("URLs with credentials are not allowed");
  }

  if (!url.hostname) {
    throw badRequest("Invalid image URL host");
  }

  return url;
}

/**
 * Resolve hostname and reject private / link-local / metadata targets.
 */
export async function assertPublicHostname(hostname) {
  const host = String(hostname || "").toLowerCase();

  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host === "metadata.google.internal"
  ) {
    throw badRequest("URL host is not allowed");
  }

  if (isIP(host)) {
    if (isPrivateOrReservedIp(host)) {
      throw badRequest("URL host is not allowed");
    }
    return;
  }

  let addresses;
  try {
    addresses = await lookup(host, { all: true, verbatim: true });
  } catch {
    throw badRequest("Unable to resolve image URL host");
  }

  if (!addresses?.length) {
    throw badRequest("Unable to resolve image URL host");
  }

  for (const entry of addresses) {
    if (isPrivateOrReservedIp(entry.address)) {
      throw badRequest("URL host resolves to a private network");
    }
  }
}
