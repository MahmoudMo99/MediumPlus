import { Component } from '@angular/core';

@Component({
  selector: 'app-image-edito',
  templateUrl: './image-edito.component.html',
  styleUrls: ['./image-edito.component.css'],
})
export class ImageEditoComponent {
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

  validate(savedData: any) {
    if (!savedData.url.trim()) {
      return false;
    }
    return true;
  }
}
