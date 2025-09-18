import { useAuth } from "./useAuth";
import type { UserRole } from "../types";

export const useAuthorization = () => {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (requiredRole: UserRole): boolean => {
    if (!isAuthenticated || !user) {
      return false;
    }
    
    // Define role hierarchy (admin > moderator > user)
    const roleHierarchy: Record<UserRole, number> = {
      user: 1,
      moderator: 2,
      admin: 3
    };
    
    const userRoleLevel = roleHierarchy[user.role as UserRole] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole];
    
    return userRoleLevel >= requiredRoleLevel;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return roles.some(role => hasRole(role));
  };

  const isAdmin = (): boolean => hasRole('admin');
  const isModerator = (): boolean => hasRole('moderator');
  const isUser = (): boolean => hasRole('user');

  return {
    hasRole,
    hasAnyRole,
    isAdmin,
    isModerator,
    isUser,
    userRole: user?.role as UserRole | undefined
  };
};
