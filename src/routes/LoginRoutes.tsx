import { lazy } from "react";

import GuestGuard from "@/utils/route-guard/GuestGuard";
import { MinimalLayout } from "@/layout";
import { Loadable } from "@/ui-components";
import config from "@/config";

const AuthLogin = Loadable(lazy(() => import("@/pages/login/Login")));

const LoginRoutes = {
  path: "/",
  element: (
    <GuestGuard>
      <MinimalLayout />
    </GuestGuard>
  ),
  children: [
    {
      path: config.login_url,
      element: <AuthLogin />,
    },
  ],
};

export default LoginRoutes;
