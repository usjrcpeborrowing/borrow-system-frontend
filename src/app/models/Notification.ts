export interface NotificationInterface {
  _id: string;
  type: string;
  route: string;
  message: string;
  viewed: boolean;
  createdAt: string;
  updatedAt: string;
}
