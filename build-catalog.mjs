// 由 books.json 和 books/ 下的文件生成 catalog.json：补上文件大小、格式和 SHA-256。
// 用法：node build-catalog.mjs（在本目录运行）。鲸翼下载后会核对 SHA-256，改了书一定要重新生成。
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('./', import.meta.url);
const books = JSON.parse(readFileSync(new URL('books.json', root), 'utf8'));
const ids = new Set();
const catalog = {
  version: 1,
  updatedAt: new Date().toISOString().slice(0, 10),
  books: books.map(({ file, ...book }) => {
    if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(book.id) || ids.has(book.id)) throw new Error(`书目 id 无效或重复：${book.id}`);
    if (!/^books\/[\w.%-]+$/.test(file)) throw new Error(`文件路径只能是 books/ 下的文件：${file}`);
    ids.add(book.id);
    const bytes = readFileSync(new URL(file, root));
    if (statSync(new URL(file, root)).size !== bytes.length) throw new Error(`读取不完整：${file}`);
    return { ...book, format: file.split('.').pop().toUpperCase(), size: bytes.length, url: file, sha256: createHash('sha256').update(bytes).digest('hex') };
  }),
};
writeFileSync(new URL('catalog.json', root), `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`已生成 catalog.json：${catalog.books.length} 本`);
