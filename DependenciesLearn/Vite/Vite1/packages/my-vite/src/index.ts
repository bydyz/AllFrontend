#!/usr/bin/env node
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ModuleResolver } from './moduleResolver.ts';
import { Transformer } from './transform.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../vue-app');
const PORT = 5173;

const mimeTypes: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.cjs': 'application/javascript',
  '.ts': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.vue': 'application/javascript',
};

const resolver = new ModuleResolver(rootDir);
const transformer = new Transformer(resolver);

async function transformFile(filePath: string): Promise<{ content: string; contentType: string }> {
  const code = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath);
  
  if (ext === '.vue' || ext === '.ts' || ext === '.js' || filePath.includes('/node_modules/')) {
    const result = await transformer.transform(filePath, code);
    return {
      content: result.code,
      contentType: mimeTypes[ext] || 'application/javascript'
    };
  }
  
  return { content: code, contentType: mimeTypes[ext] || 'application/octet-stream' };
}

function serveFile(res: http.ServerResponse, filePath: string) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath);
  
  if (ext === '.vue' || ext === '.ts' || ext === '.js' || ext === '.mjs' || ext === '.cjs' || filePath.includes('/node_modules/')) {
    transformFile(filePath).then(({ content, contentType }) => {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(content);
    });
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }
}

function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  let url = req.url || '/';
  
  if (url === '/') {
    url = '/index.html';
  }
  
  const filePath = path.join(rootDir, url);
  
  if (url.startsWith('/@')) {
    const realPath = path.join(rootDir, url.replace('/@', '/src/'));
    serveFile(res, realPath);
  } else {
    serveFile(res, filePath);
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});