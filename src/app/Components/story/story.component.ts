import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStoryDetail } from 'src/app/Models/istory-detail';
import { StoriesService } from 'src/app/Services/stories.service';
import EditorJS from '@editorjs/editorjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  storyId: number = 0;
  story: IStoryDetail | null = null;
  apiServer: string = environment.APISERVER;
  editor!: EditorJS;
  editorData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storiesService: StoriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paraMap) => {
      this.storyId = Number(paraMap.get('storyId'));
      this.storiesService.getStoryById(this.storyId).subscribe({
        next: (res) => {
          this.editorData = JSON.parse(res.data.content);
          this.story = res.data;
          this.story.content = '';
          this.renderEditorContent();
          console.log(this.editorData);
        },
        error: (er) => {
          console.log(er);
        },
      });
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
    editorContentElement.innerHTML = '';
    // Process each block and generate HTML elements
    for (const block of this.editorData.blocks) {
      let ele = this.processBlock(block);
      editorContentElement.appendChild(ele);
    }
  }
}
