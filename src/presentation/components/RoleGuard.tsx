import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAuthorization";
import type { UserRole } from "../../types";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: UserRole;
  fallbackPath?: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  requiredRole, 
  fallbackPath = "/" 
}) => {
  const { hasRole } = useAuthorization();

  if (!hasRole(requiredRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
