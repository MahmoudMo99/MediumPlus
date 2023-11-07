export interface IStory {
  id: number;
  title: string;
  content: string;
  creationDate: Date;
  publisherName: string;
  publisherPhotoUrl: string;
  storyMainPhoto: string;
  topics: string[];
}
