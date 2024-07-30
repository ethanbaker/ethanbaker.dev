import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme/theme.service';
import { Mode } from '../../models/mode.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { LazyLoadDirective } from '../../directives/lazyload/lazyload.directive';

/**
 * NavbarComponent is used to represent a physical navbar on the application
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    LazyLoadDirective,
  ],
  providers: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  /** The toggle switch for large breakpoints */
  @ViewChild("switchLarge", { read: ElementRef }) switchLarge: ElementRef | undefined;

  /** The toggle switch for small breakpoints */
  @ViewChild("switchSmall", { read: ElementRef }) switchSmall: ElementRef | undefined;

  /** Whether or not a switch is checked */
  checked: boolean;

  /** Whether or not the menu is open */
  menuOpen: boolean = false;

  /**
   * Default constructor to set initial checked status 
   * 
   * @param httpClient Client to get svg assets
   * @param sanitizer DOM sanitizer to get svgs
   * @param themeService Theme service to get current theme
   */
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private themeService: ThemeService,
  ) {
    // Set inital status of the mode toggle
    this.checked = this.themeService.getTheme() === Mode.DARK;
  }

  /**
   * Load SVGs after the angular view loads
   */
  ngAfterViewInit() {
    // Set the moon svg to the slider
    this.httpClient
      .get("assets/svgs/moon.svg", { responseType: "text" })
      .subscribe(value => {
        if (this.switchLarge == undefined || this.switchSmall == undefined) return;

        this.switchLarge.nativeElement.querySelector('.mdc-switch__icon--on').innerHTML = this.sanitizer.bypassSecurityTrustHtml(value); 
        this.switchSmall.nativeElement.querySelector('.mdc-switch__icon--on').innerHTML = this.sanitizer.bypassSecurityTrustHtml(value); 
      });

    // Set the sun svg to the slider
    this.httpClient
      .get("assets/svgs/sun.svg", { responseType: "text" })
      .subscribe(value => {
        if (this.switchLarge == undefined || this.switchSmall == undefined) return;

        this.switchLarge.nativeElement.querySelector('.mdc-switch__icon--off').innerHTML = this.sanitizer.bypassSecurityTrustHtml(value); 
        this.switchSmall.nativeElement.querySelector('.mdc-switch__icon--off').innerHTML = this.sanitizer.bypassSecurityTrustHtml(value); 
      });
  }

  /**
   * Toggle the page theme between light and dark
   * 
   * @param event The toggle change event
   */
  toggleTheme(event: MatSlideToggleChange): void {
    this.themeService.setTheme(event.source.checked ? Mode.DARK : Mode.LIGHT);
  }

  /**
   * Toggle the menu
   */
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;

    // Disable scroll if menu is open
    this.menuOpen ? document.body.querySelector("app-root")?.classList.add("disable-scroll") : document.body.querySelector("app-root")?.classList.remove("disable-scroll");
  }
}
