import { useMutation } from "@tanstack/react-query";
import { uploadImages } from "../services/upload.service";

export function useUpload() {
  return useMutation({
    mutationFn: uploadImages,
  });
}
