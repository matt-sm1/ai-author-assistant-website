import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const homeDir = path.join(root, "public", "images", "home");
const brandDir = path.join(root, "public", "images", "brand");

const RULES = [
  { dir: brandDir, match: /^logo\.webp$/i, maxWidth: 640 },
  { dir: homeDir, match: /^test_\d+\.webp$/i, maxWidth: 160 },
  { dir: homeDir, match: /^trusted\.webp$/i, maxWidth: 1600 },
  {
    dir: homeDir,
    match: /^(hero_|feature_|m_feature_|always_|article_|cta)/i,
    maxWidth: 1200,
  },
];

const QUALITY = 80;

async function compressFile(dir, file, maxWidth) {
  const filePath = path.join(dir, file);
  const before = (await fs.stat(filePath)).size;
  const tmp = path.join(dir, `.${file}.tmp.webp`);

  await sharp(filePath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(tmp);

  await fs.rename(tmp, filePath);
  const after = (await fs.stat(filePath)).size;
  console.log(
    `${file}: ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB (max ${maxWidth}w)`
  );
}

async function runDir(dir) {
  let files;
  try {
    files = await fs.readdir(dir);
  } catch {
    console.warn(`missing dir: ${dir}`);
    return;
  }

  for (const file of files.filter((f) => f.endsWith(".webp"))) {
    const rule = RULES.find((r) => r.dir === dir && r.match.test(file));
    if (!rule) {
      console.warn(`skip (no rule): ${file}`);
      continue;
    }
    await compressFile(dir, file, rule.maxWidth);
  }
}

async function main() {
  await runDir(brandDir);
  await runDir(homeDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
