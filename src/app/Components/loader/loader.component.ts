import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LoaderService } from 'src/app/Services/spinner/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  showLoader = false;
  loaderService = inject(LoaderService);
  cdRef = inject(ChangeDetectorRef);
  constructor() {}
  ngOnInit(): void {
    this.init();
  }
  init() {
    this.loaderService.getLoaderObserver().subscribe((status) => {
      this.showLoader = status === 'start';
    });
  }
}
