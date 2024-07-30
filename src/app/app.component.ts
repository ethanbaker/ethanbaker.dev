import { Component, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme/theme.service';
import { Mode } from './models/mode.model';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { faGithub, faXTwitter, faLinkedin, faGit } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

/**
 * AppComponent holds application-wide elements, such as footers, theme toggles, layout, etc
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /** Copyright string */
  public copyright: string = "2024";

  /** Whether or not the app is in dark mode */
  public isDarkMode: boolean | null = null;

  /** List of font awesome icons */
  public icons: any = {
    "email": faEnvelope,
    "github": faGithub,
    "linkedin": faLinkedin,
    "x": faXTwitter,
  };

  /** The root HTML element */
  private _html: HTMLElement;

  /**
   * Default constructor for the application
   * 
   * @param _themeService Used to listen for theme changes
   */
  constructor(
    private _themeService: ThemeService,
    private _elementRef: ElementRef,
  ) {
    this._html = this._elementRef.nativeElement;

    // Add a year to the copyright string if needed
    const currentYear  = new Date().getFullYear();
    if (currentYear != 2024) {
      this.copyright += ` - ${currentYear}`;
    }

    // Listen to mode changes and update whether or not the app is in dark mode
    this._themeService.mode$.subscribe(
      (mode: Mode) => {
        if (mode == undefined) return;

        this.isDarkMode = mode === Mode.DARK;
      });
  }

  /**
   * Scroll to the top of the page
   */
  scrollToTop(): void {
    this._html.scrollTo(0, 0);
  }
}
