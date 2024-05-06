import { Service } from 'typedi';
import { KitTestService } from './kit-test.service';
import { TResponse } from '@/interfaces/api.interface';
import { catchAsync } from '@/utils/catch-async';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { tests } from '@/database/schema';

@Service()
export class KitTestController {
  constructor(private readonly kitTestService: KitTestService) {}

  public getAll = catchAsync(async (req, res: Response<TResponse>) => {
    const data = await this.kitTestService.getAll();

    return res.status(StatusCodes.OK).json({
      data,
    });
  });

  public getOneById = catchAsync(async (req, res: Response<TResponse>) => {
    const { id } = req.params;
    const data = await this.kitTestService.getOneById(id, {
      throwIfNotFound: true,
      message: `Cannot find kit with this id`,
    });

    return res.status(StatusCodes.OK).json({
      data,
    });
  });

  public create = catchAsync(async (req, res: Response<TResponse>) => {
    const data = await this.kitTestService.create(req.body);

    return res.status(StatusCodes.CREATED).json({
      data,
    });
  });

  public update = catchAsync(async (req, res: Response<TResponse>) => {
    const { id } = req.params;
    const data = await this.kitTestService.update({
      data: req.body,
      id,
    });

    return res.status(StatusCodes.OK).json({
      data,
    });
  });

  public delete = catchAsync(async (req, res: Response<TResponse>) => {
    const { id } = req.params;
    await this.kitTestService.delete(id as string, {
      message: 'Cannot find kit test with this id.',
      throwIfNotFound: true,
    });

    return res.status(StatusCodes.OK).json({
      message: 'Deleted kit test successfully.',
      data: null,
    });
  });

  public getPaging = catchAsync(async (req, res: Response<TResponse>) => {
    const data = await this.kitTestService.getPaging({
      query: req.query,
      opts: {
        searchFields: [tests.name],
      },
    });

    return res.status(StatusCodes.OK).json({
      data,
    });
  });

  public getForSelect = catchAsync(async (req, res: Response<TResponse>) => {
    const data = await this.kitTestService.getForSelect({
      fieldLabel: tests.name,
      fieldValue: tests.id,
    });

    return res.status(StatusCodes.OK).json({
      data,
    });
  });
}
