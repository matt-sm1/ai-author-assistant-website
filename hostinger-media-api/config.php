<?php
return [
    'signing_secret' => '823c9013770793edd39372784b7f28dc7b83be486957e9fe',
    'public_base_url' => 'https://indigo-loris-172446.hostingersite.com',
    'media_root' => __DIR__ . '/../media',
    'cors_origins' => 'https://author-ai-assistant.vercel.app',
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
