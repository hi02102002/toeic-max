import { Worker } from 'bullmq';
import { QUEUE_KEYS } from '@/constants/queue';
import { redis } from './libs/redis';
import { logger } from './utils/logger';
import { sendMail } from '@/modules/mail/send-mail';

const runWorker = () => {
  try {
    const worker = new Worker(
      QUEUE_KEYS.SEND_EMAIL,
      async job => {
        const { data } = job;

        await sendMail(data);
      },
      {
        connection: redis,
        concurrency: 15, // Number of concurrent jobs process
      },
    );

    worker.on('completed', job => {
      logger.info(`${job.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
      logger.error(`${job?.id} has failed with ${err.message}`);
    });

    worker.on('error', err => {
      logger.error(`A queue error happened: ${err.message}`);
    });
  } catch (error) {
    logger.error(error.message);
  }

  logger.info('Worker is running...');
};

runWorker();
