/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  /**
   * 컴포넌트 렌더링 시 참조할 비동기 값.
   * true 면 succComponent 를, 실패하거나 false 면 failComponent 를 렌더링 한다.
   */
  loader: () => boolean | Promise<boolean>;
  /**
   * loader 결과가 true 일 때 렌더링 할 컴포넌트.
   */
  succComponent: ComponentType<any>;
  /**
   * loader 결과가 false 이거나 실패 했을 때 렌더링 할 컴포넌트.
   */
  failComponent: ComponentType<any>;
}

/**
 * route 내에서 guard 이용 시 사용되는 비동기 컴포넌트.
 *
 * loader 프로퍼티의 비동기 결과값을 바탕으로 전달된 succComponent 를 렌더링 한다.
 *
 * 비동기 결과값이 실패하거나 loader 결과가 false 라면 failComponent 를 렌더링 한다.
 * @param props
 */
export const AsyncGuardComponent: FC<Props> = (props) => {
  const [component, setComponent] = useState<ComponentType<any> | null>(null);

  const { loader, succComponent, failComponent, ...subProps } = props;

  useEffect(() => {
    const retLoader = loader();

    if (retLoader instanceof Promise) {
      retLoader
        .then((res) => (res ? succComponent : failComponent))
        .catch(() => failComponent)
        .then((resultComponent) => setComponent(resultComponent));
    } else {
      setComponent(retLoader ? succComponent : failComponent);
    }
    return () => {
      setComponent(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Comp = component;

  if (Comp) {
    return <Comp {...subProps} />;
  }

  return null;
};
