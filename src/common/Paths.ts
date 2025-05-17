export const Paths = {
  CatchAll: "*",
  Links: {
    Base: "/links",
    RedirectToUrl: "/links/:shortUrl",
  },
  Users: { Base: "/users", Login: "/login" },
} as const;
