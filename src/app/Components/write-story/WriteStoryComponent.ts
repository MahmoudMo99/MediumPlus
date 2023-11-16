import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import EditorJS, { ToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { StoriesService } from 'src/app/Services/stories.service';
import { IStory } from 'src/app/Models/istory';
import { ImageEditoComponent } from '../image-edito/image-edito.component';

@Component({
  selector: 'app-write-story',
  templateUrl: './write-story.component.html',
  styleUrls: ['./write-story.component.css'],
})
export class WriteStoryComponent implements AfterViewInit {
  @ViewChild('editor', { read: ElementRef, static: true })
  editorElement!: ElementRef;
  editor!: EditorJS;
  editorData: any;
  story: IStory = {} as IStory;
  topics: string[] = [];

  constructor(private storiesService: StoriesService) {}

  ngAfterViewInit(): void {
    this.editor = new EditorJS({
      minHeight: 200,
      placeholder: 'Let`s write an awesome story!',
      holder: this.editorElement.nativeElement,
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: 'Enter the Title...',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3,
          },
        },
        Image: ImageEditoComponent,
      },
    });
  }

  onSubmit() {
    // Retrieve the content and make an API call
    this.editor.save().then((outputData) => {
      console.log('Article data: ', outputData);
      outputData.blocks.map((ele) => {
        switch (ele.type) {
          case 'header':
            this.story.title = ele.data.text;
            console.log('data title', ele.data.text);
            break;
          case 'paragraph':
            this.story.content = ele.data.text;
            console.log('data paragraph', ele.data.text);
            break;
          case 'image':
            this.story.title = ele.data.url;
            console.log('data title', ele.data.url);
            break;
        }
      });
      this.story.topics = this.topics;

      let formData: FormData = new FormData();
      formData.append('title', this.story.title);
      formData.append('content', this.story.content);
      this.topics.map((e, index) => {
        formData.append('topics', this.story.topics[index]);
      });
      formData.append('storyMainPhoto', this.story.storyMainPhoto);
      this.storiesService.createStory(formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
}
