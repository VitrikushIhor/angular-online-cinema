export interface MovieGenreInterface {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MovieActorInterface {
  _id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  photo: string;
  __v: number;
}

export interface MovieInterface {
  _id: string;
  poster: string;
  bigPoster: string;
  title: string;
  rating: number;
  genres: MovieGenreInterface[];
  countOpened: number;
  videoUrl: string;
  actors: MovieActorInterface[];
  slug: string;
  isSendTelegram: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  parameters: {
    year: number;
    duration: number;
    country: string;
    _id: string;
  };
}

export interface SimilarMovieInterface {
  name: string
  poster: string
  url: string
  _id: string;

}
