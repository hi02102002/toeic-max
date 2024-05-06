import { Service } from 'typedi';
import { KitsService } from './kits.service';
import { IController, TResponse } from '@/interfaces/api.interface';
import { catchAsync } from '@/utils/catch-async';
import { TKit } from './kits.type';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { kits } from '@/database/schema';

@Service()
export class KitsController {
  constructor(private readonly kitService: KitsService) {}

  public getAll = catchAsync(async (req, res: Response<TResponse>) => {
    const data = await this.kitService.getAll();

    return res.status(StatusCodes.OK).json({
      data,
    });
  });

  public getOneById = catchAsync(async (req, res: Response<TResponse>) => {
    const { id } = req.params;
    const data = await this.kitService.getOneById(id, {
      throwIfNotFound: true,
      message: `Cannot find kit with this id`,
    });

    return res.status(StatusCodes.OK).json({
      data,
    });
  });

  public create = catchAsync(async (req, res: Response<TResponse>) => {
    const data = await this.kitService.create(req.body);

    return res.status(StatusCodes.CREATED).json({
      data,
    });
  });

  public update = catchAsync(async (req, res: Response<TResponse>) => {
    const { id } = req.params;
    const data = await this.kitService.update({
      data: req.body,
      id,
      opts: {
        throwIfNotFound: true,
        message: `Cannot find kit with this id`,
      },
    });

    return res.status(StatusCodes.OK).json({
      data,
    });
  });

  public delete = catchAsync(async (req, res: Response<TResponse>) => {
    const { id } = req.params;
    await this.kitService.delete(id as string, {
      throwIfNotFound: true,
      message: `Cannot find kit with this id,`,
    });

    return res.status(StatusCodes.OK).json({
      message: 'Kit deleted successfully',
      data: null,
    });
  });

  public getPaging = catchAsync(async (req, res: Response<TResponse>) => {
    const data = await this.kitService.getPaging({
      query: req.query,
    });

    return res.status(StatusCodes.OK).json({
      data,
    });
  });

  public getForSelect = catchAsync(async (req, res: Response<TResponse>) => {
    const data = await this.kitService.getForSelect({
      fieldLabel: kits.name,
      fieldValue: kits.id,
    });

    return res.status(StatusCodes.OK).json({
      data,
    });
  });
}
