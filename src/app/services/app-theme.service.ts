import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  domElementId = 'app-theme';
  localStorageKey = 'theme';
  defaultTheme = 'md-dark-indigo';

  themes = ['md-dark-indigo', 'saga-blue'];

  getThemes = () => this.themes;

  saveLocalTheme(theme: string) {
    localStorage.setItem(this.localStorageKey, theme);
  }

  getLocalTheme() {
    let themeSaved = localStorage.getItem(this.localStorageKey);
    if (themeSaved) return themeSaved;
    else this.saveLocalTheme(this.defaultTheme);
    return this.defaultTheme;
  }

  changeTheme(theme: string) {
    let themeLink = this.document.getElementById(
      this.domElementId
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
    }
    this.saveLocalTheme(theme);
  }
}
