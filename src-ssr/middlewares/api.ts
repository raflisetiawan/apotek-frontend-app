import { ssrMiddleware } from 'quasar/wrappers';

const apiHandlers: { [key: string]: any } = {
  'req-info': import('../../src/api/req-info'),
  version: import('../../src/api/version'),
  apriori: import('src/api/apriori'),
  analyze: import('src/api/analyze'),
};
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/developing-ssr/ssr-middlewares
export default ssrMiddleware(
  async ({ app, resolve /*publicPath, render */ }) => {
    // something to do with the server "app"
    app.all(resolve.urlPath('*'), async (req, res, next) => {
      if (req.url.substring(0, 4) === '/api') {
        try {
          const path = req.url.split('?')[0].substring(5);
          const apiHandler = await apiHandlers[path];
          if (apiHandler) {
            await apiHandler.default(req, res);
          } else {
            res.sendStatus(404);
          }
        } catch (error) {
          console.error(error);
          res.sendStatus(500);
        }
      } else {
        next();
      }
    });
  }
);
