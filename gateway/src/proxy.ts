import { Express, NextFunction, Request, Response } from "express";
import { createProxyMiddleware, fixRequestBody, type Options } from "http-proxy-middleware";

const GAMES_BASE_URL = process.env.GAMES_BASE_URL || "http://localhost:3001";
const USERS_BASE_URL = process.env.USERS_BASE_URL || "http://localhost:3002";

type Routes = {
  url: string;
  proxy: Options;
}[];

export const ROUTES: Routes = [
  {
    url: "/games",
    proxy: {
      target: GAMES_BASE_URL,
      changeOrigin: true,
      autoRewrite: true,
      onProxyReq: fixRequestBody,
    },
  },
  {
    url: "/users",
    proxy: {
      target: USERS_BASE_URL,
      changeOrigin: true,
      autoRewrite: true,
      onProxyReq: fixRequestBody,
    },
  },
];

// export const setupProxies = (app: Express, routes: Routes) => {
//   routes.forEach((r) => {
//     app.use(r.url, createProxyMiddleware(r.proxy));
//   });
// };

export const setupProxies = (app: Express, routes: Routes) => {
  routes.forEach((r) => {
    app.use(r.url, createProxyMiddleware(r.proxy));
  });

  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.error("Proxy error:", err);
      res.end();
    } else {
      next();
    }
  });
};
