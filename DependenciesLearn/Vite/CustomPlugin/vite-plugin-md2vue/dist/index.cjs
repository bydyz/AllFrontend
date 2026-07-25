// vite-plugin-md2vue - Transform Markdown to Vue components
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => md2vue
});
module.exports = __toCommonJS(index_exports);

// src/utils.ts
var defaultOptions = {
  markdown: {
    gfm: true,
    breaks: false,
    pedantic: false
  },
  highlight: {
    enabled: true,
    languages: ["javascript", "typescript", "html", "css", "json", "bash", "python", "java", "c", "cpp", "go", "rust"],
    theme: "github"
  },
  katex: {
    enabled: true,
    options: { throwOnError: false }
  },
  component: {
    name: "MarkdownContent",
    wrapperClass: "markdown-body",
    exposeProps: true
  }
};
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] !== void 0) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        result[key] = deepMerge(
          targetValue,
          sourceValue
        );
      } else {
        result[key] = sourceValue;
      }
    }
  }
  return result;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function resolveOptions(options = {}) {
  return deepMerge(defaultOptions, options);
}
function isMarkdownFile(id) {
  return id.endsWith(".md") || id.endsWith(".markdown");
}

// src/frontmatter.ts
var import_gray_matter = __toESM(require("gray-matter"), 1);
function parseFrontmatter(code) {
  try {
    const { data, content } = (0, import_gray_matter.default)(code);
    const hasFrontmatter = Object.keys(data).length > 0;
    return {
      frontmatter: hasFrontmatter ? data : null,
      content: content.trim()
    };
  } catch (error) {
    console.warn("[vite-plugin-md2vue] Frontmatter \u89E3\u6790\u5931\u8D25:", error);
    return {
      frontmatter: null,
      content: code.trim()
    };
  }
}
function generateFrontmatterVariable(frontmatter) {
  if (!frontmatter) {
    return "const frontmatter = {}";
  }
  return `const frontmatter = ${JSON.stringify(frontmatter, null, 2)}`;
}
function generatePropsDefinition(frontmatter) {
  if (!frontmatter) {
    return "";
  }
  const props = [];
  if (frontmatter.title !== void 0) {
    props.push(`  title: { type: String, default: '${escapeString(frontmatter.title)}' }`);
  }
  if (frontmatter.description !== void 0) {
    props.push(`  description: { type: String, default: '${escapeString(frontmatter.description)}' }`);
  }
  if (frontmatter.date !== void 0) {
    props.push(`  date: { type: String, default: '${escapeString(frontmatter.date)}' }`);
  }
  if (frontmatter.tags !== void 0) {
    props.push(`  tags: { type: Array, default: () => ${JSON.stringify(frontmatter.tags)} }`);
  }
  if (props.length === 0) {
    return "";
  }
  return `const props = defineProps({
${props.join(",\n")}
})`;
}
function escapeString(str) {
  return String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}

// src/markdown.ts
var import_marked = require("marked");
function configureMarked(options) {
  import_marked.marked.setOptions({
    gfm: options.gfm,
    breaks: options.breaks,
    pedantic: options.pedantic
  });
}
function renderMarkdown(content, options) {
  configureMarked(options);
  try {
    const result = import_marked.marked.parse(content);
    return typeof result === "string" ? result : "";
  } catch (error) {
    console.error("[vite-plugin-md2vue] Markdown \u89E3\u6790\u9519\u8BEF:", error);
    return content;
  }
}

// src/highlight.ts
var import_highlight = __toESM(require("highlight.js"), 1);
function highlightCode(html, options) {
  if (!options.enabled) {
    return html;
  }
  const codeBlockRegex = /<code(?:\s+class="(?:hljs\s+)?language-(\w+)")?>([\s\S]*?)<\/code>/g;
  return html.replace(codeBlockRegex, (match, lang, code) => {
    if (!lang) {
      try {
        const result = import_highlight.default.highlightAuto(code, options.languages);
        if (result.relevance > 0) {
          return `<code class="hljs language-${result.language}">${result.value}</code>`;
        }
      } catch {
      }
      return match;
    }
    if (options.languages?.includes(lang) && import_highlight.default.getLanguage(lang)) {
      try {
        const highlighted = import_highlight.default.highlight(code, { language: lang }).value;
        return `<code class="hljs language-${lang}">${highlighted}</code>`;
      } catch (error) {
        console.warn(`[vite-plugin-md2vue] \u4EE3\u7801\u9AD8\u4EAE\u5931\u8D25 (${lang}):`, error);
      }
    }
    return match;
  });
}

// src/katex.ts
var import_katex = __toESM(require("katex"), 1);
function renderKatex(html, options) {
  if (!options.enabled) {
    return html;
  }
  const blockMathRegex = /\$\$([\s\S]+?)\$\$/g;
  html = html.replace(blockMathRegex, (match, formula) => {
    try {
      return import_katex.default.renderToString(formula.trim(), {
        displayMode: true,
        ...options.options
      });
    } catch (error) {
      console.warn("[vite-plugin-md2vue] \u5757\u7EA7\u6570\u5B66\u516C\u5F0F\u6E32\u67D3\u5931\u8D25:", error);
      return match;
    }
  });
  const inlineMathRegex = /\$([^\$\n]+?)\$/g;
  html = html.replace(inlineMathRegex, (match, formula) => {
    try {
      return import_katex.default.renderToString(formula.trim(), {
        displayMode: false,
        ...options.options
      });
    } catch (error) {
      console.warn("[vite-plugin-md2vue] \u884C\u5185\u6570\u5B66\u516C\u5F0F\u6E32\u67D3\u5931\u8D25:", error);
      return match;
    }
  });
  return html;
}

// src/generator.ts
function generateVueComponent(html, frontmatter, options) {
  const componentName = options.name;
  const wrapperClass = options.wrapperClass;
  const frontmatterVariable = generateFrontmatterVariable(frontmatter);
  const propsDefinition = options.exposeProps ? generatePropsDefinition(frontmatter) : "";
  const scriptSetupContent = [
    propsDefinition,
    frontmatterVariable
  ].filter(Boolean).join("\n\n");
  return `
<template>
  <div class="${wrapperClass}">
    ${html}
  </div>
</template>

<script setup>
${scriptSetupContent}
</script>

<style scoped>
.${wrapperClass} {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  padding: 20px;
}

.${wrapperClass} :deep(h1),
.${wrapperClass} :deep(h2),
.${wrapperClass} :deep(h3),
.${wrapperClass} :deep(h4),
.${wrapperClass} :deep(h5),
.${wrapperClass} :deep(h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.${wrapperClass} :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.${wrapperClass} :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.${wrapperClass} :deep(p) {
  margin-top: 0;
  margin-bottom: 16px;
}

.${wrapperClass} :deep(ul),
.${wrapperClass} :deep(ol) {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 16px;
}

.${wrapperClass} :deep(li) {
  margin-top: 0.25em;
}

.${wrapperClass} :deep(blockquote) {
  margin: 0 0 16px 0;
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

.${wrapperClass} :deep(pre) {
  background: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin-top: 0;
  margin-bottom: 16px;
}

.${wrapperClass} :deep(code) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 85%;
}

.${wrapperClass} :deep(code:not(pre code)) {
  background: rgba(27, 31, 35, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

.${wrapperClass} :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-top: 0;
  margin-bottom: 16px;
}

.${wrapperClass} :deep(th),
.${wrapperClass} :deep(td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.${wrapperClass} :deep(th) {
  font-weight: 600;
  background: #f6f8fa;
}

.${wrapperClass} :deep(tr:nth-child(2n)) {
  background: #f6f8fa;
}

.${wrapperClass} :deep(img) {
  max-width: 100%;
  height: auto;
}

.${wrapperClass} :deep(hr) {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}
</style>
  `.trim();
}

// src/transform.ts
function transform(code, id, options) {
  const { frontmatter, content } = parseFrontmatter(code);
  let html = renderMarkdown(content, options.markdown);
  if (options.highlight.enabled) {
    html = highlightCode(html, options.highlight);
  }
  if (options.katex.enabled) {
    html = renderKatex(html, options.katex);
  }
  return generateVueComponent(html, frontmatter, options.component);
}

// src/index.ts
function md2vue(options = {}) {
  const resolvedOptions = resolveOptions(options);
  return {
    name: "vite-plugin-md2vue",
    transform(code, id) {
      if (!isMarkdownFile(id)) {
        return void 0;
      }
      try {
        return transform(code, id, resolvedOptions);
      } catch (error) {
        console.error(`[vite-plugin-md2vue] \u8F6C\u6362\u6587\u4EF6 ${id} \u5931\u8D25:`, error);
        return void 0;
      }
    }
  };
}
//# sourceMappingURL=index.cjs.map