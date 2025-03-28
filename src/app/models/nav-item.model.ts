import { UrlTree } from "@angular/router";

/**
 * NavItem model represents a navigation link in the navbar. Each item 
 * contains data about how the navigation link should be rendered
 * 
 * A nav item can link to a route (type = 'route'), an external url
 * (type = 'external'), or contain sub-items for dropdowns (type = 'menu')
 */
export interface NavItem {
    name: string; // Content in the link
    url: string | any[] | UrlTree; // URL to navigate to
    type: 'route' | 'external' | 'menu'; // Type of link
    children?: NavItem[]; // Sub-items for dropdowns
}