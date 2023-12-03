import { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const GAMES_BASE_URL = process.env.GAMES_BASE_URL || "http://localhost:3001";
const USERS_BASE_URL = process.env.USERS_BASE_URL || "http://localhost:3002";

type Routes = {
  url: string;
  auth: boolean;
  proxy: {
    target: string;
    changeOrigin: boolean;
    // pathRewrite: {
    //   [key: string]: string;
    // };
  };
}[];

export const ROUTES: Routes = [
  {
    url: "/games",
    auth: true,
    // creditCheck: false,
    // rateLimit: {
    //   windowMs: 15 * 60 * 1000,
    //   max: 5,
    // },
    proxy: {
      target: GAMES_BASE_URL,
      changeOrigin: true,
      // pathRewrite: {
      //   [`^/games`]: "",
      // },
    },
  },
  {
    url: "/users",
    auth: true,
    // creditCheck: true,
    proxy: {
      target: USERS_BASE_URL,
      changeOrigin: true,
      // pathRewrite: {
      //   [`^/users`]: "",
      // },
    },
  },
];

export const setupProxies = (app: Express, routes: Routes) => {
  routes.forEach((r) => {
    app.use(r.url, createProxyMiddleware(r.proxy));
  });
};
