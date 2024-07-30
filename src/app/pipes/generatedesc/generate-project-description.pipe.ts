import { Pipe, PipeTransform } from '@angular/core';
import { ProjectDescription } from '../../models/project-description.model';

/**
 * GenerateProjectDescriptionPipe generates HTML for a project description given specific attributes
 */
@Pipe({
  name: 'generateProjectDescription',
  standalone: true
})
export class GenerateProjectDescriptionPipe implements PipeTransform {

  transform(project: ProjectDescription, ...args: unknown[]): unknown {
    let str = `<div class="sub-html-container">
      <div class="title-container">
        <h2>${project.title}</h2>
      </div>
      
      <div class="date-container">
        <h3>Date</h3>
        <p>${project.date}</p>
      </div>

      <div class="description-container">
        <h3>Description</h3>`;

    for (let sentence of project.description) {
      str += `<p>${sentence}</p>`;
    }
        
    str += `</div>
      <div class="link-container">
        <a href='${project.link_url}'>${project.link_desc}</a>
      </div>
    </div>`;

    return str;
  }

}
