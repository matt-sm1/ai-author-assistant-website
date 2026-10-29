import { createHash } from "node:crypto";
import { AppError } from "@/backend/errors/app-error";
import { HTTP_STATUS } from "@/backend/constants/http-status";
import { ERROR_CODES } from "@/backend/constants/error-codes";

/**
 * Server-side Hostinger upload (mirrors browser direct-upload flow).
 * Used by import-url so remote images land in our media_root.
 */

function storageError(message) {
  return new AppError(
    message,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ERROR_CODES.STORAGE_PROVIDER_ERROR,
  );
}

async function readJson(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

/**
 * @param {object} options
 * @param {Buffer} options.buffer
 * @param {string} options.filename
 * @param {string} options.mimeType
 * @param {object} options.session - createUploadSession result
 * @returns {Promise<object>} receipt
 */
export async function uploadBufferToHostinger({
  buffer,
  filename,
  mimeType,
  session,
}) {
  const { ticket, endpoints, useChunked, chunkSize } = session;

  if (!ticket || !endpoints?.upload) {
    throw storageError("Invalid upload session");
  }

  const ticketHeader = JSON.stringify(ticket);

  if (!useChunked) {
    const form = new FormData();
    form.append(
      "file",
      new Blob([buffer], { type: mimeType || "application/octet-stream" }),
      filename || "file",
    );
    form.append("ticket", ticketHeader);

    const response = await fetch(endpoints.upload, {
      method: "POST",
      headers: { "X-Upload-Ticket": ticketHeader },
      body: form,
    });

    const data = await readJson(response);
    if (!response.ok || !data.receipt) {
      throw storageError(data.message || "Direct upload to Hostinger failed");
    }
    return data.receipt;
  }

  const initResponse = await fetch(endpoints.init, {
    method: "POST",
    headers: {
      "X-Upload-Ticket": ticketHeader,
      "Content-Type": "application/json",
    },
    body: "{}",
  });
  const initData = await readJson(initResponse);
  if (!initResponse.ok || initData.success === false) {
    throw storageError(initData.message || "Failed to init chunked upload");
  }

  const total = buffer.length;
  const size = Number(chunkSize) || 5 * 1024 * 1024;
  let offset = 0;
  let index = 0;

  while (offset < total) {
    const end = Math.min(offset + size, total);
    const chunk = buffer.subarray(offset, end);

    const chunkResponse = await fetch(endpoints.chunk, {
      method: "POST",
      headers: {
        "X-Upload-Ticket": ticketHeader,
        "X-Chunk-Index": String(index),
        "Content-Type": "application/octet-stream",
      },
      body: chunk,
    });

    const chunkData = await readJson(chunkResponse);
    if (!chunkResponse.ok || chunkData.success === false) {
      throw storageError(chunkData.message || `Chunk ${index} failed`);
    }

    offset = end;
    index += 1;
  }

  const sha256 = createHash("sha256").update(buffer).digest("hex");
  const completeResponse = await fetch(endpoints.complete, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticket, sha256 }),
  });
  const complete = await readJson(completeResponse);
  if (!completeResponse.ok || !complete.receipt) {
    throw storageError(complete.message || "Missing upload receipt");
  }

  return complete.receipt;
}
