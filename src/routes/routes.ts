import { Router } from "express";
import { validate } from "@src/middlewares";
import { LinkSchema } from "@src/validation";
import { Paths } from "@src/common";
import { LinkRoutes } from "./LinkRoutes";

/******************************************************************************
                                Variables
******************************************************************************/

const BaseRouter = Router();

// ** Add LinkRouter ** //

// Init router
const linkRouter = Router();
linkRouter.post(Paths.Links.Base, validate(LinkSchema), LinkRoutes.add);
linkRouter.get(Paths.Links.RedirectToUrl, LinkRoutes.redirectToUrl);

// Add LinkRouter
BaseRouter.use(linkRouter);

/******************************************************************************
                                Export
******************************************************************************/

export { BaseRouter };
