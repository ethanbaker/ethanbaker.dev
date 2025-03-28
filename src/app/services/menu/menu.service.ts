import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * MenuService keeps track of the menu state across the application
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  /** Status on the menu */
  private _openSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public open$ = this._openSubject.asObservable();

  /**
   * Toggle the menu
   */
  public toggleMenu(): void {
    this._changeMenuStatus(!this._status);
  }

  /**
   * Open the menu
   */
  public openMenu(): void {
    this._changeMenuStatus(true);
  }

  /**
   * Close the menu
   */
  public closeMenu(): void {
    this._changeMenuStatus(false);
  }

  /**
   * Set the menu's opened status to the provided boolean
   * 
   * @param isOpen Whether or not the menu is open
   */
  private _changeMenuStatus(isOpen: boolean): void {
    // Don't do anything if the requested status is the same as the current status
    if (this._status === isOpen) return;

    this._openSubject.next(isOpen);

    // Disable scroll if menu is open
    isOpen ? document.body.querySelector("app-root")?.classList.add("disable-scroll") : document.body.querySelector("app-root")?.classList.remove("disable-scroll");
  }

  /** Getters */
  public get open(): boolean {
    return this._openSubject.value;
  }

  public get closed(): boolean {
    return !this._openSubject.value;
  }

  private get _status(): boolean {
    return this._openSubject.value;
  }
}
