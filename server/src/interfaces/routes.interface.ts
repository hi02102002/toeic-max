import type { Router } from 'express'

export interface IRoutes {
    router: Router
    initRoutes(
        extendsRoutes?: (
            path: string,
            router: Router,
            controller: unknown,
        ) => void,
    ): void
}
