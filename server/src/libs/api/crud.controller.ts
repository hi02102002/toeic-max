import { HttpException } from '@/exceptions/http-exception'
import { catchAsync } from '@/utils/catch-async'
import { PgColumn } from 'drizzle-orm/pg-core'
import { StatusCodes } from 'http-status-codes'
import { toLower } from 'lodash'
import { CRUDBaseService } from './crud.service'

/**
 * Base controller class for CRUD operations.
 * @template S - The type of the CRUD service.
 */
export abstract class CRUDBaseController<
    S extends CRUDBaseService = CRUDBaseService,
> {
    /**
     * Creates an instance of CRUDBaseController.
     * @param {S} service - The CRUD service.
     * @param {string} modelName - The name of the model.
     * @param {{ value: PgColumn, label: PgColumn }} forSelectFields - The fields used for select operations.
     */
    constructor(
        protected readonly service: S,
        protected readonly modelName: string,
        protected readonly forSelectFields?: {
            value: PgColumn
            label: PgColumn
        },
    ) {
        this.service = service
        this.modelName = modelName
        this.forSelectFields = forSelectFields
    }

    /**
     * Get all entities.
     * @param {Request} _req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response with the data.
     */
    public getAll = catchAsync(async (_req, res) => {
        const data = await this.service.getAll()
        return res.status(StatusCodes.OK).json({ data })
    })

    /**
     * Get an entity by ID.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response with the data.
     */

    public getOneById = catchAsync(async (req, res) => {
        const { id } = req.params
        const data = await this.service.getOneById(id, {
            message: `Cannot find ${toLower(this.modelName)} with this id`,
            throwIfNotFound: true,
        })

        return res.status(StatusCodes.OK).json({ data })
    })

    /**
     * Create a new entity.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response with the created entity.
     */
    public create = catchAsync(async (req, res) => {
        const data = await this.service.create(req.body)
        return res.status(StatusCodes.CREATED).json({
            message: `Created ${toLower(this.modelName)} successfully`,
            data,
        })
    })

    /**
     * Update an entity by ID.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response with the updated entity.
     */
    public update = catchAsync(async (req, res) => {
        const { id } = req.params
        const data = await this.service.update({
            data: req.body,
            id,
            opts: {
                throwIfNotFound: true,
                message: `Cannot find ${toLower(this.modelName)} with this id`,
            },
        })

        return res.status(StatusCodes.OK).json({
            data,
            message: `Updated ${toLower(this.modelName)} successfully`,
        })
    })

    /**
     * Delete an entity by ID.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response with a success message.
     */
    public delete = catchAsync(async (req, res) => {
        const { id } = req.params
        await this.service.delete(id, {
            message: `Cannot find ${toLower(this.modelName)} with this id`,
            throwIfNotFound: true,
        })

        return res.status(StatusCodes.OK).json({
            message: `Deleted ${toLower(this.modelName)} successfully`,
        })
    })

    /**
     * Get entities with pagination.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response with the paginated data.
     */
    public getPaging = catchAsync(async (req, res) => {
        const data = await this.service.getPaging({
            query: req.query as any,
        })

        return res.status(StatusCodes.OK).json({ data })
    })

    /**
     * Get entities for select fields.
     * @param {Request} _req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response with the data for select fields.
     */
    public getForSelect = catchAsync(async (_req, res) => {
        if (!this.forSelectFields) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST,
                'This route is not available for this model.',
            )
        }

        const data = await this.service.getForSelect({
            fieldLabel: this.forSelectFields.label,
            fieldValue: this.forSelectFields.value,
        })
        return res.status(StatusCodes.OK).json({ data })
    })

    public getPagingBuilder = catchAsync(async (req, res) => {
        const data = await this.service.getPagingBuilder({
            filters: req.query?.filters as any,
            limit: req.query?.limit as any,
            orderBy: req.query?.orderBy as any,
            page: req.query?.page as any,
            withs: req.query?.withs as any,
            q: req.query?.q as any,
            searchFields: req.query?.searchFields as any,
        })

        return res.status(StatusCodes.OK).json({ data })
    })
}
