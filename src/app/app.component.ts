import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easyaccounting-front';

  @HostBinding('class') componentCssClass: any;

  constructor(public overlayContainer: OverlayContainer, private themeService: ThemeService) {
    this.onSetTheme('ligth-theme');
    themeService.getOnTheme().subscribe((theme) => {
      this.onSetTheme(theme);
    });
  }
  public onSetTheme(e: string) {
    this.overlayContainer.getContainerElement().classList.add(e);
    this.componentCssClass = e;
  }
}
