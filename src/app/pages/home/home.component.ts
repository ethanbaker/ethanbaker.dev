import { Component } from '@angular/core';
import { LazyLoadDirective } from '../../directives/lazyload/lazyload.directive';
import { LightgalleryModule } from 'lightgallery/angular';
import lgZoom from 'lightgallery/plugins/zoom';
import { CommonModule } from '@angular/common';
import { ProjectDescription } from '../../models/project-description.model';
import { GenerateProjectDescriptionPipe } from '../../pipes/generatedesc/generate-project-description.pipe';
import { TypingComponent } from '../../components/typing/typing.component';
import { SliderComponent } from "../../components/slider/slider.component";

/**
 * HomeComponent contains logic and attributes necessary to render the home page
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LazyLoadDirective,
    LightgalleryModule,
    CommonModule,
    GenerateProjectDescriptionPipe,
    TypingComponent,
    SliderComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  /** Settings for lightgallery */
  public settings: any = {
    counter: true,
    plugins: [lgZoom],
  }

  /** Project images */
  public projectImages: ProjectDescription[] = [
    {
      title: "Horus",
      date: "Jan 2024 - Present",
      description: [
        `• Description: An open-source, modularity-focused personal assistant connecting over 5 various existing tools`,
        `• Technologies Used: Golang, SQL, OpenAI, HTTP protocols, External APIs (Notion, Discord, OpenWeather)`,
        `• Outcome: Experience all over the tech stack, gained insight on how to break down work into subtasks`
      ],
      link_url: "https://github.com/ethanbaker/horus",
      link_desc: "View on GitHub",
      src: "/assets/images/horus.png",
    },
    {
      title: "Cpick",
      date: "Mar 2020 - Present",
      description: [
        `• Description: A color-picker built completely in the terminal, utilizing 7 color formats, 200+ custom colors and advanced search`,
        `• Technologies Used: Golang, Color Formats (RGB, HSV, HSL, etc), JSON config`,
        `• Outcome: Gained understanding of open source software development, terminal application development`,
      ],
      link_url: "https://github.com/ethanbaker/cpick",
      link_desc: "View on GitHub",
      src: "/assets/images/cpick.png",
    },
    {
      title: "ValAi Model Consulting",
      date: "May 2023 - Jun 2023",
      description: [
        `• Description: Data collection and model architecture creation for creating high level carbon footprint estimation`,
        `• Technologies Used: Excel, Python, PowerPoint, business communication`,
        `• Outcome: Experience as a consultant, communicating with small business`,
      ],
      link_url: "https://www.valai.com.au/",
      link_desc: "View Website",
      src: "/assets/images/valai.png",
    },
    {
      title: "Game AI Exploration",
      date: "Jan 2023 - May 2023",
      description: [
        `• Description: A game engine showcasing 12 widely adopted AI algorithms and their applications`,
        `• Technologies Used: C++, Make, Data Structures (trees/graphs/etc), Algorithms (pathfinding/behavior/etc)`,
        `• Outcome: Obtained a richer understanding of data structures and algorithms commonly utilized in software`,
      ],
      link_url: "https://github.com/ethanbaker/game-ai",
      link_desc: "View on GitHub",
      src: "/assets/images/gameai.png",
    },
    {
      title: "Linux Server Administrator",
      date: "Nov 2018 - Present",
      description: [
        `• Description: Building and maintaining my own personal Linux server, utilizing it to run over 10 applications (APIs, websites, Docker images, etc)`,
        `• Technologies Used: Ubuntu Server, Linux, Bash, CI/CD, Docker, RESTful APIs, Nginx`,
        `• Outcome: Developed understanding of IT processes in maintaining servers and deploying applications`,
      ],
      link_url: "",
      link_desc: "",
      src: "/assets/images/linux_server.jpg",
    },
  ];
}
