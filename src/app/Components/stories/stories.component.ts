import { Component, OnInit } from '@angular/core';
import { IStory } from 'src/app/Models/istory';
import { StoriesService } from 'src/app/Services/stories.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import EditorJS from '@editorjs/editorjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
})
export class StoriesComponent implements OnInit {
  isUserLogged: boolean;
  stories: IStory[] = [];
  apiServer: string = environment.APISERVER;
  editor!: EditorJS;
  editorData: any;
  constructor(
    private authService: UserAuthService,
    private storiesService: StoriesService
  ) {
    this.isUserLogged = false;
    console.log(this.isUserLogged);
  }
  updateLoggedStatus() {
    this.authService.loggedStatus().subscribe((status) => {
      this.isUserLogged = status;

      console.log('Stories');
    });
  }
  ngOnInit(): void {
    this.updateLoggedStatus();

    this.storiesService.getAll().subscribe({
      next: (res) => {
        // this.editorData = JSON.parse(res.data.content);
        this.stories = res.data;
        // this.stories.content = '';
        this.renderEditorContent();
        console.log(this.stories);
        // console.log(this.editorData);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  retrieveEditorData() {
    this.editor.save().then((data) => {
      this.editorData = data;
      this.renderEditorContent();
    });
  }

  processBlock(block: any): any {
    switch (block.type) {
      case 'paragraph':
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = block.data.text;
        return paragraphElement;
      case 'header':
        const headerElement = document.createElement('h1');
        headerElement.textContent = block.data.text;
        return headerElement;
      case 'list':
        const listElement = document.createElement('ul');
        for (const item of block.data.items) {
          const listItemElement = document.createElement('li');
          listItemElement.textContent = item;
          listElement.appendChild(listItemElement);
        }
        return listElement;
      case 'image':
        const imageElement = document.createElement('img');
        imageElement.src = block.data.url;
        imageElement.alt = block.data.caption;
        return imageElement;
    }
  }

  renderEditorContent() {
    const editorContentElement: any = document.getElementById('editor-content');
    if (editorContentElement) {
      editorContentElement.innerHTML = '';
      // Process each block and generate HTML elements
      for (const block of this.editorData.blocks) {
        let ele = this.processBlock(block);
        editorContentElement.appendChild(ele);
      }
    }
  }
}
