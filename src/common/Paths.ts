export const Paths = {
  CatchAll: "*",
  Links: {
    Base: "/links",
    RedirectToUrl: "/links/:shortUrl",
  },
  Users: {
    RequestSignUp: "/request-signup",
    CompleteSignUp: "/complete-signup",
    Login: "/login",
  },
} as const;
