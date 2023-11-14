import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import EditorJS ,{ ToolConstructable }from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { HttpClient } from '@angular/common/http';
import { StoriesService } from 'src/app/Services/stories.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
class SimpleImage {
  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  render() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.style.padding = '5px';
    inputElement.style.borderRadius = '10px';
    inputElement.style.border = '1px solid #555';
    inputElement.style.outline = 'none';
    inputElement.style.marginTop = '10px';
    inputElement.addEventListener('change', this.handleFileSelect.bind(this));
    return inputElement;
  }

  handleFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target!.result;
        if (typeof imageUrl === 'string') {
          const imgDiv = document.getElementById('imgDiv');
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          imageElement.style.width = '100%';
          imageElement.style.height = '100%';
          imgDiv?.appendChild(imageElement);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  save(blockContent: any) {
    return {
      url: blockContent.value,
    };
  }

}





@Component({
  selector: 'app-write-story',
  templateUrl: './write-story.component.html',
  styleUrls: ['./write-story.component.css'],
})
export class WriteStoryComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', { read: ElementRef, static: true })
  editorElement!: ElementRef;
  editor!: EditorJS;

  constructor(private http:HttpClient ,private s:StoriesService ,private authService:UserAuthService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  private initializeEditor(): void {
    this.editor = new EditorJS({
      minHeight: 200,
      placeholder: 'Let`s write an awesome story!',
      holder: this.editorElement.nativeElement,
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: 'Enter the Header...',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3,
          },
        },
        Image: SimpleImage,
      },
     

    });
 
  }

  saveContent() {
    // Retrieve the content and make an API call
    this.editor.save().then((outputData) => {
      console.log('Article data: ', outputData.blocks );

      // Replace 'your-api-endpoint' with the actual endpoint
      const apiUrl = 'https://localhost:44303/api/Stories';

      // Send the outputData to your server using HTTP client
      this.http.post(apiUrl, { content: JSON.stringify(outputData.blocks) }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.token}`,
        } })
        .subscribe(
          response => {
            console.log('API Response: ', response);
          },
          error => {
            console.error('API Error: ', error);
          }
        );
    }).catch((error) => {
      console.log('Saving failed: ', error);
    });
  }





}

