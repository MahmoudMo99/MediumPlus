import { Component, OnInit } from '@angular/core';
import { ITopic } from 'src/app/Models/itopic';
import { TopicsService } from 'src/app/Services/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics: ITopic[] = [];

  constructor(private topicsService: TopicsService){}
  ngOnInit(): void {
    this.topicsService.getAllTopics().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.topics = res.data;
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {},
    });
  }


}
