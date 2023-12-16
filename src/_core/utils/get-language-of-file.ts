export const getLanguageOfFile = (filePath: string) => {
  const extensionDotIndex = filePath.lastIndexOf(".");
  const extension = filePath.slice(extensionDotIndex + 1);

  console.log(extension, 'ext');

  switch (extension) {
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
      return "javascript";
    case "json":
      return "json";  
    case "vue":
    case "html":
      return "html";
    case "css":
    case "scss":
    case "less":
      return "css";
    default:
      return "javascript";
  }
};