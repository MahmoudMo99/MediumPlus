export interface IStory {
  id: number;
  title: string;
  content: string;
  creationDate: Date;
  publisherName: string;
  publisherPhoto: string;
  storyMainPhoto: string;
  topics: string[];
  stroriesNumber: number;
  storyPhotos: string[];
  storyVideos: string[];
  topicNames: string[];
  publisherId: number;

}
