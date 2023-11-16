export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  bio: string;
  photoUrl: string;
  followersCount: number;
  isFollowing: boolean;
}
export interface UserProfile {
  id: number;
  name: string;
  bio: string;
  photoUrl: string;
  followersCount: number;
  isFollowing: boolean;
}
export interface UpdateProfile {
  id: number;
  name: string;
  bio: string;
  photo: string;
}
