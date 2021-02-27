import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { moduleRoutes } from "./ModuleRoutes";
import { RouteSystems } from "./RouteSystem";

export default function AppRouter() {
  return (
    <Suspense fallback={<></>}>
      <Switch>
        <RouteSystems routes={moduleRoutes} />
      </Switch>
    </Suspense>
  );
}
