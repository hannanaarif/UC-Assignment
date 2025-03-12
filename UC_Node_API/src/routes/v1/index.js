import express from "express";

import todoRouter from "./todoRouter.js";

const v1Router = express.Router();

v1Router.use('/todo', todoRouter);

export default v1Router;
