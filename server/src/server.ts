import { App } from '@/app'
import { AuthRoute } from '@/modules/auth'
import { CrawlRoute } from '@/modules/crawl'
import { HistoryRoute } from '@/modules/history'
import { KitTestRoute } from '@/modules/kit-test'
import { KitsRoute } from '@/modules/kits'
import { QuestionSectionRoute } from '@/modules/question-section'
import { ResultRoute } from '@/modules/result'
import { SectionRoute } from '@/modules/section'
import { TopicRoute } from '@/modules/topic'
import { UploadRoute } from '@/modules/upload'
import { VocabulariesRoute } from '@/modules/vocabulary'
import { ValidateEnv } from '@utils/validateEnv'

ValidateEnv()

const app = new App([
    new CrawlRoute(),
    new KitsRoute(),
    new AuthRoute(),
    new KitTestRoute(),
    new QuestionSectionRoute(),
    new UploadRoute(),
    new VocabulariesRoute(),
    new TopicRoute(),
    new SectionRoute(),
    new HistoryRoute(),
    new ResultRoute(),
])

app.listen()
