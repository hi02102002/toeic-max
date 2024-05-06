import { IRoutes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import Container from 'typedi';
import { KitsController } from './kits.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { KitDto, QueryKitDto } from './kits.dto';

export class KitsRoute implements IRoutes {
  path = '/kits';
  router = Router();
  controller = Container.get(KitsController);

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(`${this.path}/for-select`, this.controller.getForSelect);
    this.router.get(`${this.path}/get-all`, this.controller.getAll);
    this.router.get(`${this.path}/:id`, this.controller.getOneById);
    this.router.post(`${this.path}`, ValidationMiddleware(KitDto), this.controller.create);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(KitDto), this.controller.update);
    this.router.delete(`${this.path}/:id`, this.controller.delete);
    this.router.get(this.path, ValidationMiddleware(QueryKitDto, 'query'), this.controller.getPaging);
  }
}
