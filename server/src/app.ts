import { LOG_FORMAT, NODE_ENV, PORT } from '@config'
import type { IRoutes } from '@interfaces/routes.interface'
import { ErrorMiddleware } from '@middlewares/error.middleware'
import { logger, stream } from '@utils/logger'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import 'reflect-metadata'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './libs/swagger'
import { runWorker } from './worker'

export class App {
    public app: express.Application
    public env: string
    public port: string | number

    constructor(routes: IRoutes[]) {
        this.app = express()
        this.env = NODE_ENV || 'development'
        this.port = PORT || 8080

        this.initializeMiddlewares()
        this.initializeRoutes(routes)
        this.initializeErrorHandling()
        this.initializeSwagger()

        runWorker()
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info('=================================')
            logger.info(`======= ENV: ${this.env} =======`)
            logger.info(`🚀 App listening on the port ${this.port}`)
            logger.info('=================================')
        })
    }

    public getServer() {
        return this.app
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT, { stream }))
        this.app.use(
            cors({
                origin: ['http://localhost:5173', 'http://localhost:4173'],
                credentials: true,
            }),
        )
        this.app.use(hpp())
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cookieParser())
    }

    private initializeRoutes(routes: IRoutes[]) {
        routes.forEach((route) => {
            this.app.use('/api', route.router)
        })
    }

    private initializeErrorHandling() {
        this.app.use(ErrorMiddleware)
    }

    private initializeSwagger() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

        this.app.get('/api-docs.json', (_req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.send(swaggerSpec)
        })

        logger.info(
            `This docs is available at http://localhost:${this.port}/api-docs`,
        )
    }
}
