import { Directive, ElementRef, OnInit } from '@angular/core';

/**
 * LazyLoadDirective is used to lazy load images
 */
@Directive({
  selector: '[lazyLoad]',
  standalone: true,
})
export class LazyLoadDirective implements OnInit {
  /**
   * Default constructor of the directive 
   * 
   * @param elementRef Used to load the image
   */
  constructor(private elementRef: ElementRef) {}

  /**
   * When created, lazy load the image
   */
  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imgElement = entry.target as HTMLImageElement;
          imgElement.src = imgElement.src || "";
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(this.elementRef.nativeElement);
  }
}