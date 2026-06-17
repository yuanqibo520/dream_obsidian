export async function uploadImages(files: File[]): Promise<string[]> {
  return files.map((file) => URL.createObjectURL(file));
}
