import { IRoutes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import Container from 'typedi';
import { CrawlController } from './crawl.controller';

export class CrawlRoute implements IRoutes {
  path = '/crawl';
  router = Router();
  controller = Container.get(CrawlController);

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(`${this.path}/kits`, this.controller.crawlKits);
    this.router.get(`${this.path}/kits/:id`, this.controller.crawlKit);
    this.router.get(`${this.path}/topics`, this.controller.crawlTopics);
    this.router.get(`${this.path}/courses`, this.controller.crawlCourses);
    this.router.get(`${this.path}/course-topic/:id`, this.controller.crawlCourseTopic);
  }
}
