import { Service } from 'typedi';
import { CrawlService } from './crawl.service';
import { catchAsync } from '@/utils/catch-async';
import { TResponse } from '@/interfaces/api.interface';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';

@Service()
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  crawlKits = catchAsync<TResponse>(async (req, res) => {
    const kits = await this.crawlService.crawlKits();
    res.status(HttpStatusCode.Ok).json({
      data: kits,
    });
  });

  crawlKit = catchAsync<TResponse>(async (req, res) => {
    const { id } = req.params;
    const kit = await this.crawlService.crawlKitDetail(id);
    res.status(HttpStatusCode.Ok).json({
      data: kit,
    });
  });

  crawlTopics = catchAsync<TResponse>(async (req, res) => {
    const topics = await this.crawlService.crawlTopics();
    res.status(HttpStatusCode.Ok).json({
      data: topics,
    });
  });

  crawlCourses = catchAsync<TResponse>(async (req, res) => {
    const courses = await this.crawlService.crawlCourses();
    res.status(HttpStatusCode.Ok).json({
      data: courses,
    });
  });

  crawlAllCourseTopics = catchAsync<TResponse>(async (req, res) => {});

  crawlCourseTopic = catchAsync<TResponse>(async (req, res) => {
    const { id } = req.params;
    const data = await this.crawlService.crawlCourseTopic(id);
    res.status(HttpStatusCode.Ok).json({
      data,
    });
  });
}
