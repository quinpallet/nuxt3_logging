import { defineEventHandler, readBody } from 'h3';
import { logger } from '../../utils/logger';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log(body, body.operation)

  if (body) {
    const { message, level } = body;

    // ログレベルに応じて動的にロギング
    if (typeof logger[level as keyof typeof logger] === 'function') {
      (logger[level as keyof typeof logger] as (message: string) => void)(message);
    } else {
      logger.info(message);  // デフォルトはinfoレベル
    }
  }

  return { success: true };
});
