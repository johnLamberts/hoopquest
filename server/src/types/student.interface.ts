export interface StudentInterface {
  _id: string;
  firstName: string;
  lastName: string;
  profilePic?: {
    key?: string;
    name: string;
    url?: string;
  };
  email: string;
  mobile: number;
  password: string;
  isBlocked: boolean;
  profileUrl: string;
}
