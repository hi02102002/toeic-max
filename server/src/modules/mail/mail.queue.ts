import { QUEUE_KEYS } from '@/constants/queue';
import { HttpException } from '@/exceptions/http-exception';
import { redis } from '@/libs/redis';
import { Queue } from 'bullmq';
import { Service } from 'typedi';
import { sendMail } from './send-mail';

@Service()
export class SendMailQueue extends Queue {
  constructor() {
    super(QUEUE_KEYS.SEND_EMAIL, {
      connection: redis,
    });
  }

  /**
   * Adds a job to the mail queue.
   *
   * @param {object} options - The options for the job.
   * @param {boolean} [options.isPreventSpam=true] - Flag indicating whether to prevent spam.
   * @param {object} data - The data for the job.
   * @returns {Promise<object>} - The added job.
   * @throws {HttpException} - Throws a 429 error if the user is sending emails too frequently.
   */
  async addJob({
    isPreventSpam = true,
    ...data
  }: Parameters<typeof sendMail>[0] & {
    isPreventSpam?: boolean;
  }) {
    if (isPreventSpam) {
      const lastSubmissionTime = await redis.get(`send-email:${data.to}`);
      const currentTime = new Date().getTime();
      if (lastSubmissionTime && currentTime - parseInt(lastSubmissionTime) < 60 * 1000) {
        throw new HttpException(429, 'You can only send email once per minute');
      }
    }

    const job = await this.add('send-mail', data, {
      attempts: 1,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });

    await redis.set(`send-email:${data.to}`, new Date().getTime().toString(), 'EX', 60);

    return job;
  }
}
