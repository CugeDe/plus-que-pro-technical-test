import 'server-only';

/* eslint-disable no-param-reassign */
import got from 'got';

if ('undefined' !== typeof window) throw new Error('This file should only be run in the server');

export const DEFAULT_OPTIONS = {
  headers: {
    Accept: ['application/ld+json', 'application/json'].join(', '),
    Origin: `localhost:${process.env.PORT}`,
    Referer: `localhost:${process.env.PORT}`,
  },
  prefixUrl: process.env.API_URL,
  throwHttpErrors: false,
};

export const getClient = (options = DEFAULT_OPTIONS) => (
  got.extend(options)
    .extend({
      hooks: {
        beforeRequest: [
          (opt) => {
            opt.resolveBodyOnly = false;
            opt.responseType = 'json';
          },
        ],
      },
    })
);
