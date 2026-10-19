<?php
/**
 * Copy to config.php on the Hostinger server (never commit real secrets).
 * Place this API under: public_html/media-api/
 * Media files live under: public_html/media/
 */

return [
    // Must match Vercel HOSTINGER_MEDIA_SIGNING_SECRET
    'signing_secret' => 'CHANGE_ME_LONG_RANDOM_SECRET',

    // Public origin that serves /media/... (no trailing slash)
    'public_base_url' => 'https://cdn.example.com',

    // Absolute filesystem path to the media root (sibling of media-api recommended)
    // e.g. /home/u123/domains/cdn.example.com/public_html/media
    'media_root' => __DIR__ . '/../media',

    // Comma-separated browser origins allowed for CORS (must include live marketing domain)
    'cors_origins' => 'https://www.authoraiassistant.com,https://authoraiassistant.com,https://ai-author-assistant-website.vercel.app,http://localhost:3000',

    'max_image_bytes' => 10 * 1024 * 1024,
    'max_video_bytes' => 100 * 1024 * 1024,

    'allowed_mimes' => [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/avif',
        'video/mp4',
        'video/webm',
        'video/quicktime',
    ],
];
