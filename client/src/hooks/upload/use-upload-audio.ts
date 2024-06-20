import { uploadApi } from '@/apis/upload.api'
import { useMutation } from '@tanstack/vue-query'

export const useUploadAudio = () => {
    return useMutation({
        mutationFn: async (file: File | Blob) => {
            return uploadApi.uploadAudio(file)
        },
    })
}
