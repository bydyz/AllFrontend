import fs from 'fs';
import path from 'path';

export interface ResolveResult {
  resolved: string;
  isExternal?: boolean;
}

export class ModuleResolver {
  private appRoot: string;

  constructor(appRoot: string) {
    this.appRoot = appRoot;
  }

  getAppRoot(): string {
    return this.appRoot;
  }

  resolve(id: string, importer?: string): ResolveResult | null {
    if (id.startsWith('.') || id.startsWith('/')) {
      return this.resolveRelative(id, importer);
    }
    return this.resolveNodeModule(id);
  }

  private resolveRelative(id: string, importer?: string): ResolveResult {
    let resolved: string;

    if (importer) {
      const importerDir = path.dirname(importer);
      resolved = path.resolve(this.appRoot, importerDir, id);
    } else {
      resolved = path.resolve(this.appRoot, id);
    }

    if (!path.extname(resolved)) {
      const tsRes = resolved + '.ts';
      const jsRes = resolved + '.js';
      const vueRes = resolved + '.vue';
      const indexTs = path.resolve(resolved, 'index.ts');
      const indexJs = path.resolve(resolved, 'index.js');
      const indexVue = path.resolve(resolved, 'index.vue');

      if (fs.existsSync(tsRes)) return { resolved: tsRes };
      if (fs.existsSync(jsRes)) return { resolved: jsRes };
      if (fs.existsSync(vueRes)) return { resolved: vueRes };
      if (fs.existsSync(indexTs)) return { resolved: indexTs };
      if (fs.existsSync(indexJs)) return { resolved: indexJs };
      if (fs.existsSync(indexVue)) return { resolved: indexVue };
    }

    if (fs.existsSync(resolved)) {
      return { resolved };
    }

    return { resolved: id };
  }

  private resolveNodeModule(id: string): ResolveResult {
    const nodeModulesPath = path.resolve(this.appRoot, 'node_modules', id);
    
    if (fs.existsSync(nodeModulesPath)) {
      const pkgJson = path.resolve(nodeModulesPath, 'package.json');
      if (fs.existsSync(pkgJson)) {
        const pkg = JSON.parse(fs.readFileSync(pkgJson, 'utf-8'));
        let main = pkg.exports?.['.']?.import || pkg.module || pkg.main || 'index.js';
        
        if (typeof main !== 'string') {
          main = main.default || main.node || 'index.js';
        }
        
        const resolved = path.resolve(nodeModulesPath, main);
        if (fs.existsSync(resolved)) {
          return { resolved };
        }
      }
      const indexJs = path.resolve(nodeModulesPath, 'index.js');
      if (fs.existsSync(indexJs)) {
        return { resolved: indexJs };
      }
    }

    return { resolved: id, isExternal: true };
  }
}