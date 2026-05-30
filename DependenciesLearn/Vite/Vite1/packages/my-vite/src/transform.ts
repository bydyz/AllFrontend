import path from 'path';
import { ModuleResolver } from './moduleResolver.ts';

const IMPORT_RE = /import\s+(?:[\w{}\s,*]+\s+from\s+)?['"]([^'"]+)['"]/g;
const DYNAMIC_IMPORT_RE = /import\s*\(['"]([^'"]+)['"]\)/g;

interface TransformResult {
  code: string;
  deps: string[];
}

export class Transformer {
  private resolver: ModuleResolver;
  private cache: Map<string, TransformResult> = new Map();

  constructor(resolver: ModuleResolver) {
    this.resolver = resolver;
  }

  async transform(filePath: string, code: string): Promise<TransformResult> {
    const cached = this.cache.get(filePath);
    if (cached && cached.code === code) {
      return cached;
    }

    let result: TransformResult;

    if (filePath.endsWith('.vue')) {
      result = await this.transformVue(filePath, code);
    } else {
      result = await this.transformJS(filePath, code);
    }

    this.cache.set(filePath, result);
    return result;
  }

  private async transformJS(filePath: string, code: string): Promise<TransformResult> {
    const deps: string[] = [];

    const replaced = code
      .replace(IMPORT_RE, (match, imp) => {
        deps.push(imp);
        const resolved = this.resolver.resolve(imp, filePath);
        const url = '/' + path.relative(this.resolver.getAppRoot(), resolved.resolved).replace(/\\/g, '/');
        return match.replace(`'${imp}'`, `'${url}'`)
                   .replace(`"${imp}"`, `"${url}"`);
      })
      .replace(DYNAMIC_IMPORT_RE, (match, imp) => {
        deps.push(imp);
        const resolved = this.resolver.resolve(imp, filePath);
        const url = '/' + path.relative(this.resolver.getAppRoot(), resolved.resolved).replace(/\\/g, '/');
        return match.replace(`'${imp}'`, `'${url}'`)
                   .replace(`"${imp}"`, `"${url}"`);
      });

    return { code: replaced, deps };
  }

  private async transformVue(filePath: string, code: string): Promise<TransformResult> {
    const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
      return { code: '', deps: [] };
    }

    const scriptContent = scriptMatch[1];
    const transformed = await this.transformJS(filePath, scriptContent);

    const vueCode = code.replace(
      /<script[^>]*>[\s\S]*?<\/script>/,
      `<script>${transformed.code}</script>`
    );

    return { code: vueCode, deps: transformed.deps };
  }
}