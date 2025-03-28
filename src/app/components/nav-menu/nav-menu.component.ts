import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { NavItem } from '../../models/nav-item.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MenuService } from '../../services/menu/menu.service';

/**
 * NavMenuComponent is used to render a menu modal from the original navbar. It is designed
 * to be able to be nested within itself to create a multi-level menu
 */
@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  /** The nav items to render */
  @Input() items!: NavItem[];

  /** Sub-level menu element */
  @ViewChild("menu", { static: true }) menu!: MatMenu;

  /**
   * Constructor to initialize services
   * 
   * @param _menuService The menu service to close the menu
   */
  constructor(private _menuService: MenuService) { }

  /**
   * Scroll the page to the top after click
   */
  public scrollTop(): void {
    window.scrollTo(0, 0);
  }

  /**
   * Close the menu
   */
  closeMenu(): void {
    this._menuService.closeMenu();
  }
}