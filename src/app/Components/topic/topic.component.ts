import { Component, OnInit } from '@angular/core';
import { IStory } from 'src/app/Models/istory';
import { TopicService } from 'src/app/Services/topic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  allStories: IStory[] = [];
  apiServer: string = environment.APISERVER;

  paginatedStories: IStory[] = [];
  firsrSlicePaginated: IStory[] = this.paginatedStories.slice(0, 2);
  secondSlicePaginated: IStory[] = this.paginatedStories.slice(
    2,
    this.paginatedStories.length
  );

  constructor(private topicService: TopicService) {}
  ngOnInit(): void {
    this.topicService.getAllPaginationStories().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.paginatedStories = res.data;
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {},
    });

    this.topicService.getAlltopicStories().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.allStories = res.data;
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {},
    });
  }
}
