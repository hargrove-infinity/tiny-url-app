import { Router } from "express";
import { checkAuth, validate } from "@src/middlewares";
import {
  LinkSchema,
  ShortUrlSchema,
  UserSchema,
  LoginUserSchema,
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
  Paths.Users.Base,
  validate({ schema: UserSchema }),
  UserRoutes.add
);

userRouter.get(Paths.Users.EmailVerification, UserRoutes.emailVerification);

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
