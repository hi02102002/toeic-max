import { TResponse } from '@/interfaces/api.interface'
import { catchAsync } from '@/utils/catch-async'
import { HttpStatusCode } from 'axios'
import { Service } from 'typedi'
import { CrawlService } from './crawl.service'

@Service()
export class CrawlController {
    constructor(private readonly crawlService: CrawlService) {}

    crawlKits = catchAsync<TResponse>(async (_req, res) => {
        const kits = await this.crawlService.crawlKits()
        res.status(HttpStatusCode.Ok).json({
            data: kits,
        })
    })

    crawlKit = catchAsync<TResponse>(async (req, res) => {
        const { id } = req.params
        const kit = await this.crawlService.crawlKitDetail(id)
        res.status(HttpStatusCode.Ok).json({
            data: kit,
        })
    })

    crawlTopics = catchAsync<TResponse>(async (_req, res) => {
        const topics = await this.crawlService.crawlTopics()
        res.status(HttpStatusCode.Ok).json({
            data: topics,
        })
    })

    crawlCourses = catchAsync<TResponse>(async (_req, res) => {
        const courses = await this.crawlService.crawlCourses()
        res.status(HttpStatusCode.Ok).json({
            data: courses,
        })
    })

    crawlCourseTopic = catchAsync<TResponse>(async (req, res) => {
        const { id } = req.params
        const data = await this.crawlService.crawlCourseTopic(id)
        res.status(HttpStatusCode.Ok).json({
            data,
        })
    })

    getDirect = catchAsync<TResponse>(async (req, res) => {
        const data = await this.crawlService.getDirect(
            req.method.toUpperCase() as any,
            req.query.url as string,
        )

        res.status(HttpStatusCode.Ok).json({
            data,
        })
    })

    crawlSpell = catchAsync<TResponse>(async (req, res) => {
        const data = await this.crawlService.crawlSpell()
        res.status(HttpStatusCode.Ok).json({
            data,
        })
    })
}
