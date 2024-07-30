import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, share } from 'rxjs';

/**
 * StorageService is used to wrap local storage functionality with observables/subscribes
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /** Our local copy of the storage service */
  private _storage: Map<string, any> = new Map<string, any>();

  /** Create a new subject defined to be a map */
  private _onSubject = new Subject<{ key: string, value: any }>();

  /** An observable of the subject map we created. This should fire whenever changes to the local storage occur */
  private _changes$ = this._onSubject.asObservable().pipe(share());

  /**
   * Default constructor of the StorageService, which starts an event listener to the "storage" event, or
   * whenever something gets stored in local storage. StorageService initalizes local storage
   */
  constructor() {
    window.addEventListener("storage", this._storageEventListener.bind(this));
    this._updateStorage();
  }

  /**
   * When the application closes, remove the event listener and close the subject
   */
  public ngOnDestroy(): void {
    window.removeEventListener("storage", this._storageEventListener.bind(this));
    this._onSubject.complete();
  }

  /**
   * Store an item (key-value pair) in local storage 
   * 
   * @param key
   * @param value
   */
  public setItem(key: string, value: any): void {
    if (typeof value == "string") {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    this._updateStorage();

    this._onSubject.next({ key: key, value: value });
  }

  /**
   * Get an item from the local storage
   * 
   * @param key The key to access storage info from
   * @returns The value from the key in local storage, undefined if not returned
   */
  public getItem(key: string): any {
    const item = this._storage.get(key);

    try {
      // If JSON parse succeeds, returned parsed item
      return JSON.parse(item);
    } catch (_) {
      // Otherwise, return string
      return item;
    }
  }

  /**
   * Clear a key from the local storage 
   * 
   * @param key 
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
    this._updateStorage();

    this._onSubject.next({ key: key, value: null });
  }

  /**
   * Load an item from local storage by returning a promise when it loads
   * 
   * @param key The key to access
   */
  public loadItem(key: string): Observable<any> {
    const value = this.getItem(key);
    const subject = new BehaviorSubject<any>(value);

    // If the subject has a non-undefined value, return it
    if (value != undefined) {
      subject.complete();

      return subject.asObservable();
    }

    // Otherwise, subscribe to changes in storage
    this._changes$.subscribe(
      (entry: { key: string; value: string }) => {
        // Only continue for matching keys
        if (entry == undefined || entry.key !== key) {
          return;
        }

        try {
          // If JSON parse succeeds, returned parsed item
          const item = JSON.parse(entry.value);
          subject.next(item);
        } catch (_) {
          // Otherwise, return string
          subject.next(entry.value as any);
        }

        subject.complete();
      });

    return subject.asObservable();
  }

  /**
   * Get the entirety of the local storage and return it as a map
   * 
   * @returns A list of map entries in local storage
   */
  private _updateStorage(): void {
    let s = new Map<string, any>();

    // Loop for each item in the local storage map
    for (let i = 0; i < localStorage.length; i++) {
      // Get the key and value
      const key = localStorage.key(i)
      const value = localStorage.getItem(key || "")

      // Don't add undefined keys (should never happen but need it for ts checks)
      if (key == undefined) {
        continue;
      }

      // Add it to the list of entries to return
      s.set(key, value);
    }

    this._storage = s;
  }

  /**
   * Listen to storage events and wait for local storage events 
   * @param event 
   * @returns 
   */
  private _storageEventListener(event: StorageEvent): void {
    // We only care about localStorage events
    if (event.storageArea != localStorage) {
      return;
    }

    // Null keys aren't allowed. If a valid key, update the local storage
    const key = event.key;
    if (key == undefined) {
      return;
    }
    this._updateStorage();

    // The value of the stored item is either an object in JSON or a string. Assume it is json
    let value;
    try {
      value = JSON.parse(event.newValue || "");
    } catch (_) {
      value = null;
    }

    // Update the subject that we have a new entry (default to string value on bad json read)
    this._onSubject.next({ key: key, value: value });
  }
}
