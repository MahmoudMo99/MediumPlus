import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStoryDetail } from 'src/app/Models/istory-detail';
import { StoriesService } from 'src/app/Services/stories.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  storyId: number = 0;
  story: IStoryDetail | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storiesService: StoriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paraMap) => {
      this.storyId = Number(paraMap.get('storyId'));
      this.storiesService.getStoryById(this.storyId).subscribe({
        next: (res) => {
          this.story = res.data;
          console.log(this.story);
        },
        error: (er) => {
          console.log(er);
        },
      });
    });
  }
}
