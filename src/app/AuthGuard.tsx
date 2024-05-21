// AuthGuard.tsx
import React from "react";
import { useAuth } from "./AuthContext2";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { session } = useAuth();

    if (!session) {
      return <></>;
    }

    return <WrappedComponent {...props} />;
  };

  // displayName を設定
  ComponentWithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
