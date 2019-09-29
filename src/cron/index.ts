import cron from 'node-cron';
import Debug from 'debug';

const debug = Debug('server:cron');

const initCron = () => {
  cron.schedule('*/5 * * * *', async () => {
    debug('createJobFromKeywords');
  });

  cron.schedule('*/1 * * * *', async () => {
    debug('unlockJobs');
  });
};

export default initCron;
