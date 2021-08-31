import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Role } from '../../functions/src/auth/role';

interface ProtectedRouteProps {
  component: React.ReactNode
  isAuthenticated: boolean;
  roles: Role[];
  userRole: Role | undefined;
  path: string;
}

export const ProtectedRoute = ({
                                 component: Component,
                                 isAuthenticated,
                                 roles,
                                 userRole,
                                 path
                               }: ProtectedRouteProps) => {
  const isProtected = roles.includes(userRole!)
  return (
    <Route
      exact
      path={path}
      render={(props) =>
        // @ts-ignore
        isAuthenticated && isProtected ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}
