// Used to send logs to loggly for centralized front-end log management
import { LogglyTracker } from 'loggly-jslogger';

const logger = new LogglyTracker();

logger.push({ 'logglyKey': '14b608a9-db9f-4ba4-8e19-56d4629722af' });

export default logger;