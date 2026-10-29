import { withAuth } from "@/backend/middleware/auth.middleware";
import { importFromUrlController } from "@/backend/controllers/media.controller";
import { rateLimit, clientKeyFromRequest } from "@/backend/lib/rate-limit";
import { AppError } from "@/backend/errors/app-error";
import { handleError } from "@/backend/errors/error-handler";
import { HTTP_STATUS } from "@/backend/constants/http-status";
import { ERROR_CODES } from "@/backend/constants/error-codes";

export const runtime = "nodejs";

async function importFromUrlWithLimit(request, ...rest) {
  const key = clientKeyFromRequest(request, "media-import-url");
  const limited = rateLimit(key, { limit: 20, windowMs: 60_000 });
  if (!limited.ok) {
    return handleError(
      new AppError(
        "Too many import requests. Try again shortly.",
        HTTP_STATUS.TOO_MANY_REQUESTS,
        ERROR_CODES.VALIDATION_ERROR,
      ),
    );
  }
  return importFromUrlController(request, ...rest);
}

export const POST = withAuth(importFromUrlWithLimit);
