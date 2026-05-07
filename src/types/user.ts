export type userType = {
  id: string;
  name: string;
  contact: string;
  email: string;
  role: "admin" | "user";
  email_verified_at?: Date;
  image?: string;
  last_updated_by?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};
