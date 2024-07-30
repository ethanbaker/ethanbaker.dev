import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Mode } from '../../models/mode.model';
import { ConfigService } from '../config/config.service';
import { LocalConfig } from '../../models/local-config.model';
import { DOCUMENT } from '@angular/common';

/**
 * ThemeService is used to set and record the current theme state
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /** Whether or not the website is in dark mode */
  private _mode: BehaviorSubject<Mode> = new BehaviorSubject<Mode>(Mode.LIGHT);

  /** Observable on the website theme */
  public mode$: Observable<Mode> = this._mode.asObservable();

  /**
   * Default constructor for the theme service, which reads in the theme state from local storage
   * 
   * @param configService Service to find config information
   * @param document The HTML document to affect
   */
  constructor(
    private _configService: ConfigService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._configService.config$.subscribe(
      (config: LocalConfig) => {
        // Only continue for valid configs
        if (config == undefined) return;

        // Set the mode to the config's mode
        this._mode.next(config.mode);
        this._updateDocument(config.mode === Mode.DARK);
      });
  }

  /**
   * Change the current theme to a provided mode
   * 
   * @param mode The mode to provide
   */
  public setTheme(mode: Mode): void {
    // Ignore undefined modes
    if (mode == undefined) return;

    this._configService.update("mode", mode);
    this._updateDocument(mode === Mode.DARK);
  }

  /**
   * Get the theme status directly
   * 
   * @returns The theme status as a Mode enum
   */
  public getTheme(): Mode {
    return this._mode.getValue();
  }

  /**
   * Change the document to be affected by the current mode
   * 
   * @param isDarkMode Whether or not to set the dark mode class
   */
  private _updateDocument(isDarkMode: boolean): void {
    if (isDarkMode) {
      // Set dark mode
      this.document.body.classList.add("dark-mode");
      this.document.documentElement.style.setProperty("--bg-color", "#292929");
      this.document.documentElement.style.setProperty("--text-color", "#eeeeee");
      this.document.documentElement.style.setProperty("--hover-color", "#ff4400");
      this.document.documentElement.style.setProperty("--line-color", "#474747");
      this.document.documentElement.style.setProperty("--link-color", "#949494");
    } else {
      // Set light mode
      this.document.body.classList.remove("dark-mode");
      this.document.documentElement.style.setProperty("--text-color", "#292929")
      this.document.documentElement.style.setProperty("--bg-color", "#eeeeee")
      this.document.documentElement.style.setProperty("--hover-color", "#67e1ea")
      this.document.documentElement.style.setProperty("--line-color", "#949494")
      this.document.documentElement.style.setProperty("--link-color", "#474747")
    }
  }
}
