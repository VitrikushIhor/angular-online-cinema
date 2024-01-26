export interface AuthInterface {
  email: string;
  password: string;
}

export interface AuthResponseInterface {
  accessToken: string
  refreshToken: string
  user: UserInterface
}

export interface UserInterface {
  _id: string
  email: string
  password: string
  isAdmin: boolean
  userName: string
  avatar: string
  createdAt: string


}
