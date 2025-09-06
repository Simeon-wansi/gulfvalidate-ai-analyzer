export const downloadFile = (blob: Blob, fileName: string, mimeType: string): void => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([blob], { type: mimeType }));
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
