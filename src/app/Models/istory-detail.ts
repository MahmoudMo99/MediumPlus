export interface IStoryDetail {
  id: number;
  title: string;
  content: string;
  publisherName: string;
  publisherID: number;
  pulisherPhoto: string;
  creationDate: Date;
  storyPhotos: string[];
  storyVideos: string[];
  topics: string[];
  reactsCount: number;
}
