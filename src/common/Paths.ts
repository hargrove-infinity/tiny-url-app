export const Paths = {
  CatchAll: "*",
  Links: {
    Base: "/links",
    RedirectToUrl: "/links/:shortUrl",
  },
  Users: {
    Base: "/users",
    EmailVerification: "/users/email-verification",
    CompleteSignUp: "/complete-signup",
    Login: "/login",
  },
} as const;
