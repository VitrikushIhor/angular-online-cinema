import {MovieInterface} from './movie.interface';

export interface CommentInterface {
  _id: string
  createdAt: string
  updatedAt: string
  user: {
    avatar: string
    userName: string
    email: string
    _id: string
  }
  movie: MovieInterface
  message: string
}
