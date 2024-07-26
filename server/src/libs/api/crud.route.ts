import { IRoutes } from '@/interfaces/routes.interface'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { RolesMiddleware } from '@/middlewares/roles.middleware'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
import { Router } from 'express'
import { CRUDBaseController } from './crud.controller'

function getClassMethods(obj: any) {
    return Object.keys(obj).filter((item) => typeof obj[item] === 'function')
}

export enum CrudActions {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    GET_ONE = 'getOneById',
    GET_ALL = 'getAll',
    GET_PAGING = 'getPaging',
    GET_FOR_SELECT = 'getForSelect',
    GET_PAGING_BUILDER = 'getPagingBuilder',
}

export type TConfigRoute = {
    middleware?: any[]
    method?: 'get' | 'post' | 'put' | 'delete'
    exclude?: boolean
    path?: string
    roles?: ('ADMIN' | 'USER')[]
    requireAuth?: boolean
}

export type TMapConfigRoute = {
    [key in CrudActions]?: TConfigRoute
}

/**
 * Base class for CRUD routes.
 * @template CT - The type of the CRUD controller.
 */
export abstract class CrudRoute<CT extends CRUDBaseController<any>>
    implements IRoutes
{
    /**
     * The path of the route.
     */
    protected readonly path: string
    /**
     * The router of the route.
     */
    router: Router
    /**
     * The controller of the route.
     */
    protected readonly controller: CT

    /**
     * The configuration of the routes.
     */
    private configRoutes: TMapConfigRoute
    private dtos: {
        createDto: any
        updateDto: any
        queryDto: any
    }

    /**
     * The methods of the controller.
     */
    private methods: string[] = []

    constructor({
        path = '',
        controller,
        configRoutes,
        dtos,
    }: {
        controller: CT
        dtos: {
            createDto: any
            updateDto: any
            queryDto: any
        }
        configRoutes?: TMapConfigRoute
        path: string
    }) {
        this.controller = controller
        this.router = Router()
        this.path = path
        this.methods = getClassMethods(controller)

        this.dtos = dtos
        this.configRoutes = Object.keys(this.getDefaultsConfigRoutes()).reduce(
            (acc, key) =>
                ({
                    ...acc,
                    [key]: {
                        ...this.getDefaultsConfigRoutes()[key],
                        ...configRoutes?.[key],
                    },
                }) as TMapConfigRoute,
            {} as TMapConfigRoute,
        )
        this.initRoutes()
    }

    private getDefaultsConfigRoutes(): TMapConfigRoute {
        return {
            [CrudActions.CREATE]: {
                method: 'post',
                middleware: [ValidationMiddleware(this.dtos.createDto)],
                requireAuth: true,
                roles: ['ADMIN'],
            },
            [CrudActions.UPDATE]: {
                method: 'put',
                path: '/:id',
                middleware: [ValidationMiddleware(this.dtos.updateDto)],
                requireAuth: true,
                roles: ['ADMIN'],
            },
            [CrudActions.DELETE]: {
                method: 'delete',
                path: '/:id',
                requireAuth: true,
                roles: ['ADMIN'],
            },
            [CrudActions.GET_ONE]: {
                method: 'get',
                path: '/get-one/:id',
            },
            [CrudActions.GET_ALL]: {
                method: 'get',
                path: '/get-all',
            },
            [CrudActions.GET_PAGING]: {
                method: 'get',
                middleware: [
                    ValidationMiddleware(
                        this.dtos.queryDto,
                        'query',
                        true,
                        false,
                        true,
                    ),
                ],
            },
            [CrudActions.GET_FOR_SELECT]: {
                method: 'get',
                path: '/for-select',
            },
            [CrudActions.GET_PAGING_BUILDER]: {
                method: 'get',
                path: '/get-paging-builder',
                middleware: [
                    ValidationMiddleware(
                        this.dtos.queryDto,
                        'query',
                        true,
                        false,
                        true,
                    ),
                ],
            },
        }
    }

    initRoutes(): void {
        this.methods.forEach((method) => {
            const config = this.configRoutes[method]

            if (config?.exclude) return

            const middleware = config?.middleware || []
            const roles = config?.roles || []
            const requireAuth = config?.requireAuth || false

            const path = config?.path ? `${config.path}` : ''
            const fullPath = `${this.path}${path}`

            this.router[config?.method]?.(
                fullPath,
                ...middleware,
                ...(requireAuth ? [AuthMiddleware] : []),
                ...(roles.length ? [RolesMiddleware(roles)] : []),
                this.controller[method],
            )
        })
    }

    abstract extendRoutes(): void
}
