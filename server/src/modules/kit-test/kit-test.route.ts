import { IRoutes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import Container from 'typedi';
import { KitTestController } from './kit-test.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { KitTestDto, QueryKitTestDto } from './kit-test.dto';

export class KitTestRoute implements IRoutes {
  path = '/kit-tests';
  router = Router();
  controller = Container.get(KitTestController);

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(`${this.path}/for-select`, this.controller.getForSelect);
    this.router.get(`${this.path}/get-all`, this.controller.getAll);
    this.router.get(`${this.path}/:id`, this.controller.getOneById);
    this.router.post(`${this.path}`, ValidationMiddleware(KitTestDto), this.controller.create);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(KitTestDto), this.controller.update);
    this.router.delete(`${this.path}/:id`, this.controller.delete);
    this.router.get(this.path, ValidationMiddleware(QueryKitTestDto, 'query'), this.controller.getPaging);
  }
}
