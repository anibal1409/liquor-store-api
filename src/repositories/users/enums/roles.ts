export enum UserRole {
  Super = 'super',
  SalesAdvisor = 'sales-advisor',
  Manager = 'manager',
}

export const USER_ROLES_LIST = {
  [UserRole.Super]: 'Super usuario',
  [UserRole.Manager]: 'Gerente',
  [UserRole.SalesAdvisor]: 'Asesor de ventas',
};
