import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { CrawlRoute } from '@/modules/crawl';
import { KitsRoute } from '@/modules/kits';
import { AuthRoute } from '@/modules/auth';
import { KitTestRoute } from '@/modules/kit-test';

ValidateEnv();

const app = new App([new CrawlRoute(), new KitsRoute(), new AuthRoute(), new KitTestRoute()]);

app.listen();
