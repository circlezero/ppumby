import React from "react";
import { ModuleRouteModel } from "../../common/types";

const LoginPage = React.lazy(() => import("./LoginPage"));

export const loginRoutes: ModuleRouteModel[] = [
  {
    path: "",
    component: LoginPage,
  },
];
