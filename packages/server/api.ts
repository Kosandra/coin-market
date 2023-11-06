import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", function (request, response) {
  response.send("<h2>Привет Express!</h2>");
});

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(3030);

export type AppRouter = typeof appRouter;
