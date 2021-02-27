import React, { FC } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { ModuleRouteModel } from "../common/types";
import { AsyncGuardComponent } from "./AsyncGuardComponent";

interface Props {
  routes: ModuleRouteModel[];
}

const getRedirectWrap = (to: string) => () => () => <Redirect to={to} />;

function getFailComponent(route: ModuleRouteModel): any {
  const { failComponent } = route;
  if (failComponent) {
    return failComponent;
  }

  const { redirect } = route;

  if (redirect) {
    return getRedirectWrap(redirect);
  }

  return getRedirectWrap("/");
}

const getRouteRenderCurried = (route: ModuleRouteModel) => (
  props: RouteComponentProps
) => {
  if (route.guard) {
    return (
      <AsyncGuardComponent
        {...props}
        loader={route.guard}
        succComponent={route.component}
        failComponent={getFailComponent(route)}
      />
    );
  }
  const ResultComponent = route.component;
  return <ResultComponent {...props} />;
};

export const RouteSystems: FC<Props> = ({ routes }) => (
  <Switch>
    {routes.map((item) => (
      <Route
        key={item.path}
        exact={item.exact}
        path={item.path}
        component={getRouteRenderCurried(item)}
      />
    ))}
  </Switch>
);
