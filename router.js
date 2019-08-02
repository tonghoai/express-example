/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

const apiPrefix = '/api/v1';

module.exports = (app) => {
  fs
    .readdirSync(`${__dirname}/component`)
    .forEach((file) => {
      if (fs.existsSync(`${__dirname}/component/${file}/router.js`)) {
        const route = require(`${__dirname}/component/${file}/router.js`);
        const routerName = route.name === 'commons' ? '/' : `/${route.name}`;
        app.use(`${apiPrefix}${routerName}`, route.router);
      }
    });
};
