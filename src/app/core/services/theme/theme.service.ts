import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private onTheme: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public onThemeData(theme: string) {
    this.onTheme.emit(theme);
  }

  getOnTheme() {
    return this.onTheme;
  }
}
