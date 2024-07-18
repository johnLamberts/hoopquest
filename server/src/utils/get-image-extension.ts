export const getImageExtension = (mimeType: string) => {
  switch (mimeType) {
    case "image/png":
      return ".png";
    case "image/PNG":
      return ".PNG";
    case "image/jpg":
      return ".jpg";
    case "image/JPG":
      return ".JPG";
    case "image/jpeg":
      return ".jpeg";
    case "image/JPEG":
      return ".JPEG";
    case "image/webp":
      return ".webp";
    default:
      return false;
  }
};

export default getImageExtension;
