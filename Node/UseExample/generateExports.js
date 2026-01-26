// generate-entry.js
const fs = require("fs");
const path = require("path");

function generateExports(dir, outputFile) {
  const files = getAllJsFiles(dir);
  const exportStatements = [];

  files.forEach(file => {
    // 转换为相对路径（相对于输出文件的位置）
    const relativePath = path.relative(path.dirname(outputFile), file).replace(/\\/g, "/");

    // 去掉扩展名
    const moduleName = path.basename(file, ".js");

    // 生成 export 语句
    exportStatements.push(`export { default as ${moduleName} } from './${relativePath}';`);
  });

  // 写入文件
  fs.writeFileSync(outputFile, exportStatements.join("\n"));
  console.log(`✅ 已生成 ${outputFile}，包含 ${files.length} 个模块`);
}

function getAllJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllJsFiles(filePath, fileList);
    } else if (file.endsWith(".js")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 使用示例
generateExports("./src", "./src/index.js");
