import { uploadApi } from '@/apis/upload.api'
import { useMutation } from '@tanstack/vue-query'

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (file: File | Blob) => {
            return uploadApi.uploadImage(file)
        },
    })
}
