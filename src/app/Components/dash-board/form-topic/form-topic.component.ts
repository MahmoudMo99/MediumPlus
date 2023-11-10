import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITopic } from 'src/app/Models/itopic';
import { TopicsService } from 'src/app/Services/topics.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-form-topic',
  templateUrl: './form-topic.component.html',
  styleUrls: ['./form-topic.component.css'],
})
export class FormTopicComponent {
  topicName: string;
  constructor(private topicsService: TopicsService, private router: Router) {
    this.topicName = '';
  }
  onSubmit() {
    let topic = {
      name: this.topicName,
    } as ITopic;
    this.topicsService.create(topic).subscribe((res) => {
      if (res.succeeded) {
        console.log(res);
      } else {
        console.log(res);
      }
    });
  }
}
