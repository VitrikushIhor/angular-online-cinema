export interface InterfaceSlides {
  _id: string;
  link: string;
  subTitle: string;
  title: string;
  bigPoster: string;
}

export interface InterfaceActors {
  _id: string;
  url: string;
  posterPhoto: string
  content: {
    title: string
    subTitle: string
  }
}
