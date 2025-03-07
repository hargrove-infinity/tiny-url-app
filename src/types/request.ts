import { Request } from "express";

export type Req<T, U, V> = Request<T, U, V>;
