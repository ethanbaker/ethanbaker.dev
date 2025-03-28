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
import { NavItem } from '../../models/nav-item.model';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu/menu.service';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

// Static list of navigation items to render
const schema: NavItem[] = [
  { name: 'Home', url: '/', type: 'route' },
  { name: 'About', url: '/about', type: 'route' },
  { name: 'Resume', url: '/assets/files/Ethan Baker - Full Stack Developer Resume.pdf', type: 'external' },
];

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
    CommonModule,
    NavMenuComponent,
],
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

  /** Nav items to render the navbar from */
  schema: NavItem[] = schema;

  /** Whether or not the menu is open */
  menuOpen: boolean;

  /**
   * Default constructor to set initial checked status 
   * 
   * @param httpClient Client to get svg assets
   * @param sanitizer DOM sanitizer to get svgs
   * @param themeService Theme service to get current theme
   * @param menuService Menu service to toggle menu
   */
  constructor(
    private _httpClient: HttpClient,
    private _sanitizer: DomSanitizer,
    private _themeService: ThemeService,
    private _menuService: MenuService,
  ) {
    // Set inital status of the mode toggle
    this.checked = this._themeService.getTheme() === Mode.DARK;
    this._themeService.mode$.subscribe((mode: Mode) => this.checked = mode === Mode.DARK);

    // Subscribe to menu changes
    this.menuOpen = this._menuService.open;
    this._menuService.open$.subscribe((open: boolean) => this.menuOpen = open);
  }

  /**
   * Load SVGs after the angular view loads
   */
  ngAfterViewInit() {
    // Set the moon svg to the slider
    this._httpClient.get("assets/svgs/moon.svg", { responseType: "text" })
      .subscribe(value => {
        if (this.switchLarge == undefined || this.switchSmall == undefined) return;

        this.switchLarge.nativeElement.querySelector('.mdc-switch__icon--on').innerHTML = this._sanitizer.bypassSecurityTrustHtml(value); 
        this.switchSmall.nativeElement.querySelector('.mdc-switch__icon--on').innerHTML = this._sanitizer.bypassSecurityTrustHtml(value); 
      });

    // Set the sun svg to the slider
    this._httpClient.get("assets/svgs/sun.svg", { responseType: "text" })
      .subscribe(value => {
        if (this.switchLarge == undefined || this.switchSmall == undefined) return;

        this.switchLarge.nativeElement.querySelector('.mdc-switch__icon--off').innerHTML = this._sanitizer.bypassSecurityTrustHtml(value); 
        this.switchSmall.nativeElement.querySelector('.mdc-switch__icon--off').innerHTML = this._sanitizer.bypassSecurityTrustHtml(value); 
      });
  }

  /**
   * Toggle the page theme between light and dark
   * 
   * @param event The toggle change event
   */
  toggleTheme(event: MatSlideToggleChange): void {
    this._themeService.setTheme(event.source.checked ? Mode.DARK : Mode.LIGHT);
  }

  /**
   * Scroll the page to the top after click
   */
  scrollTop(): void {
    window.scrollTo(0, 0);
  }

  /**
   * Open the menu
   */
  openMenu(): void {
    this._menuService.openMenu();
  }

  /**
   * Close the menu
   */
  closeMenu(): void {
    this._menuService.closeMenu();
  }
}
