import { App } from '@/app'
import { AuthRoute } from '@/modules/auth'
import { CrawlRoute } from '@/modules/crawl'
import { KitTestRoute } from '@/modules/kit-test'
import { KitsRoute } from '@/modules/kits'
import { QuestionSectionRoute } from '@/modules/question-section'
import { UploadRoute } from '@/modules/upload'
import { VocabulariesRoute } from '@/modules/vocabulary'
import { ValidateEnv } from '@utils/validateEnv'
import { TopicRoute } from './modules/topic'

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
])

app.listen()
