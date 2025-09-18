import { useContext, useMemo } from "react";
import type { AuthContextType } from "../contexts/AuthContext";
import { AuthContext } from "../contexts/AuthContextDefinition";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useMemo(() => context as AuthContextType, [context]);
};
