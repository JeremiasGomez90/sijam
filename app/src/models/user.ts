export type UserProfileToken = {
  token: string;
  user: UserProfile;
};

export type UserProfile = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
};