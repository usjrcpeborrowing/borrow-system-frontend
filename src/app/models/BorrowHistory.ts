export interface BorrowHistory {
  _id: string;
  borrowedBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  status: string;
  quantity: number;
  className: string;
  purpose: string;
  dateborrowed: string;
}
