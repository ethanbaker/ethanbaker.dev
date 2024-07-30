/**
 * ProjectDescription interface represents a description of a project
 */
export interface ProjectDescription {
    title: string;         // Title of the project
    date: string;          // Project date
    description: string[]; // Description of the project
    link_desc: string;     // Link description
    link_url: string;      // Link URL
    src: string;           // Image source
}