export interface League {
  id: string;
  type: string;
  adminId: string;
  name: string;
  description: string;
  usersTeams?: { [key: string]: string };
}
