// Nuxtプラグインとしてlogger.*を登録
export default defineNuxtPlugin(() => {
  return {
    provide: {
      logger: {
        info: async (message: string) => {
          console.log('logger')
          await useFetch('/api/log-operation', {
            method: 'POST',
            body: { message, level: 'info' },
          });
        },
        warn: async (message: string) => {
          await useFetch('/api/log-operation', {
            method: 'POST',
            body: { message, level: 'warn' },
          });
        },
        error: async (message: string) => {
          await useFetch('/api/log-operation', {
            method: 'POST',
            body: { message, level: 'error' },
          });
        },
      },
    },
  };
});
