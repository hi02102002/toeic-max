export type TUser = {
    id: string
    name: string
    roles: ('ADMIN' | 'USER')[]
    email: string
    password: string
    avatar: string
    provider: string
    isVerified: boolean
}
