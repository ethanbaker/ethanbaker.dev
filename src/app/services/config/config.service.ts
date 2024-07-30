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
    // Load the item from local storage
    this._config.next(this._storageService.getItem(environment.localStorageKey) as LocalConfig);

    this._storageService.loadItem(environment.localStorageKey).pipe(tap(
      (config: LocalConfig) => {
        if (config != undefined) {
          // If the config is present, save it
          this._config.next(config);
        }
      }));
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
