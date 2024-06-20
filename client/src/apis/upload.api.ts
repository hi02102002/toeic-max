import { API_ENDPOINTS } from '@/constants'
import { http_client } from '@/libs/http-client'

class UploadApi {
    uploadImage(file: File | Blob): Promise<string> {
        const formData = new FormData()

        formData.append('image', file)

        return http_client
            .post(API_ENDPOINTS.UPLOAD.IMAGE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.data)
    }

    uploadAudio(file: File | Blob): Promise<string> {
        const formData = new FormData()

        formData.append('audio', file)

        return http_client
            .post(API_ENDPOINTS.UPLOAD.AUDIO, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.data)
    }
}

export const uploadApi = new UploadApi()
