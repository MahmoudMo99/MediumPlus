import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import EditorJS from '@editorjs/editorjs';


@Component({
  selector: 'app-write-story',
  templateUrl: './write-story.component.html',
  styleUrls: ['./write-story.component.css'],
})
export class WriteStoryComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', { read: ElementRef, static: true }) editorElement!: ElementRef;
  editor!: EditorJS;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  private initializeEditor(): void {
    this.editor = new EditorJS({
      minHeight: 200,
      holder: this.editorElement.nativeElement,
    });
  }
}
