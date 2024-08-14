import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinner: HTMLElement;

  constructor() {}

  private createSpinnerElement(): HTMLElement {
    const div = document.createElement('div');
    div.setAttribute('class', 'modal-loading-overlay');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.setAttribute('class', 'loading-indicator');
    const spinner = document.createElement('div');
    spinner.setAttribute('class', 'spinner-grow text-primary');
    spinner.setAttribute('role', 'status');
    const span = document.createElement('span');
    span.setAttribute('class', 'visually-hidden');
    span.textContent = 'تحميل ...';
    spinner.appendChild(span);
    loadingIndicator.appendChild(spinner);
    div.appendChild(loadingIndicator);
    return div;
  }

  showSpinner() {
    this.spinner = this.createSpinnerElement();
    document.body.appendChild(this.spinner);
    setTimeout(() => {
      this.hideSpinner();
    }, 3000);
  }
  hideSpinner() {
    this.spinner.remove();
  }
}
