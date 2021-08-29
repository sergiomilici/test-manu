export interface Review {
  id?: string;
  stars: number;
  date_of_visit: number;
  date_of_comment: number;
  comment: string;
  reply: string;
  uid: string;
  reply_date: number;
  reply_user_id: string;
}
