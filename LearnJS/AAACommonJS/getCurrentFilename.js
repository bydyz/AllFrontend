// 获取文件名
export default function getCurrentFilename(fileUrl) {
  return fileUrl.substring(fileUrl.lastIndexOf("/") + 1).split(".")[0];
}
