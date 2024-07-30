import { Injectable } from '@angular/core';
import { LocalConfig } from '../../models/local-config.model';
import { Mode } from '../../models/mode.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';

/** Default config */
const defaultConfig: LocalConfig = {
  mode: Mode.LIGHT,
}

/**
 * ConfigService handles changes to the application's locally saved config
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /** The local config our application is running off of */
  private _config = new BehaviorSubject<LocalConfig>(defaultConfig);

  /** Observable to the config so services can subscribe to changes */
  public config$ = this._config.asObservable();

  /**
   * Default constructor used to read in a config if present from local storage
   * 
   * @param _storageService Local storage service
   */
  constructor(
    private _storageService: StorageService,
  ) {
    const current = this._storageService.getItem(environment.localStorageKey) as LocalConfig;
    if (current != undefined) {
      this._config.next(current);
      return;
    }

    // Delay 1 second to load the config
    new Promise((res) => setTimeout(res, 1000)).then(
      () => {
        const current = this._storageService.getItem(environment.localStorageKey) as LocalConfig;
        if (current != undefined) {
          // If config is present, update it
          this._config.next(current);
        } else {
          // Otherwise, save the default one
          this._storageService.setItem(environment.localStorageKey, this._config.value);
        }
      });

  }

  /**
   * Update a field in the config
   * 
   * @param key The key to update
   * @param value The value to update to
   */
  public update(key: string, value: any): void {
    const config = this._config.value;

    if (key === "mode") {
      // Change the config's mode
      const mode = value as Mode;
      if (mode == undefined) throw new Error(`value '${value}' is not a valid mode`);

      config.mode = mode;
    } else {
      // An invalid key was given
      throw new Error(`key '${key}' is not in config`);
    }

    // Update the config
    this._config.next(config);
    this._storageService.setItem(environment.localStorageKey, config);
  }


  /**
   * Get the config
   * 
   * @returns A copy of the current config
   */
  public get(): LocalConfig {
    const config = this._config.value;
    const copy = Object.assign({}, config);

    return copy;
  }
}
