import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public viewMenu = false;
  constructor(private themeService: ThemeService) { }

//  @HostListener('document:click', ['$event.target'])
//   onClick(targetElement: any) {
//     console.log(targetElement.id);
//     if (targetElement.id === 'card') {
//       // console.log(targetElement.id, this.viewMenu);
//       this.viewMenu = !this.viewMenu;
//     }
//   }

  public themeAction(event: any) {
    this.themeService.onThemeData(event.checked ? 'dark-theme' : 'ligth-theme');
    // console.log(event.checked ? 'dark-theme' : 'ligth-theme');
  }

}
