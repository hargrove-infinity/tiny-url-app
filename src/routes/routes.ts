import { Router } from "express";
import { checkAuth, validate } from "@src/middlewares";
import {
  LinkSchema,
  ShortUrlSchema,
  RequestSignUpSchema,
  LoginUserSchema,
  CompleteSignUpSchema,
} from "@src/validation";
import { Paths } from "@src/common";
import { LinkRoutes } from "./LinkRoutes";
import { UserRoutes } from "./UserRoutes";

/******************************************************************************
                                Variables
******************************************************************************/

const BaseRouter = Router();

// ** Setup LinkRouter ** //

// Init router
const linkRouter = Router();

linkRouter.post(
  Paths.Links.Base,
  checkAuth,
  validate({ schema: LinkSchema }),
  LinkRoutes.add
);

linkRouter.get(
  Paths.Links.RedirectToUrl,
  validate({ schema: ShortUrlSchema, key: "params" }),
  LinkRoutes.redirectToUrl
);

// ** Setup UserRouter ** //

// Init router
const userRouter = Router();

userRouter.post(
  Paths.Users.RequestSignUp,
  validate({ schema: RequestSignUpSchema }),
  UserRoutes.requestSignUp
);

userRouter.post(
  Paths.Users.CompleteSignUp,
  validate({ schema: CompleteSignUpSchema }),
  UserRoutes.completeSignUp
);

userRouter.post(
  Paths.Users.Login,
  validate({ schema: LoginUserSchema }),
  UserRoutes.login
);

// Add LinkRouter
BaseRouter.use(linkRouter);
// Add UserRouter
BaseRouter.use(userRouter);

/******************************************************************************
                                Export
******************************************************************************/

export { BaseRouter };
