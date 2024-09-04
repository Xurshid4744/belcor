import { lazy } from "react";

import { MinimalLayout } from "@/layout";
import { Loadable } from "@/ui-components";
import AuthGuard from "@/utils/route-guard/AuthGuard";
import config from "@/config";
const HomePage = Loadable(lazy(() => import("@/pages/home/Home")));

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MinimalLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: config.home_url,
      element: <HomePage />,
    },
  ],
};

export default MainRoutes;
