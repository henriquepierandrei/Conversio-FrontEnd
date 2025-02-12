
export const getUserPermissions = (): string[] => {
    const permissions = localStorage.getItem("userPermissions");
    return permissions ? JSON.parse(permissions) : [];
  };
  
  export const hasPermission = (requiredPermissions: string[]): boolean => {
    const userPermissions = getUserPermissions();
    return requiredPermissions.every(permission => userPermissions.includes(permission));
  };
  