import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LazyLoadDirective } from '../../directives/lazyload/lazyload.directive';

/**
 * SliderComponent represents an image slider that loops between loaded images
 */
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule,
    LazyLoadDirective,
    SliderComponent,
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {
  /** Images to display */
  public images: string[] = [
    "/assets/images/slider-1.jpg",
    "/assets/images/slider-2.jpg",
    "/assets/images/slider-3.jpg",
    "/assets/images/slider-4.jpg",
  ];

  /** What image is currently being displayed */
  public currentImageIndex = 0;

  private _transitionRate: number = 6000;

  /**
   * Start the image slider when the component is created
   */
  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, this._transitionRate);
  }
}
