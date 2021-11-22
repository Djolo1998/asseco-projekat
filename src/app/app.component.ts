import { AppThemeService } from './services/app-theme.service';
import { CategoryService } from './services/category.service';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private appThemeService: AppThemeService
  ) {
    translateService.setDefaultLang(this.selectedLanguages);
  }

  title = 'praksa-projekat';

  selectedLanguages = 'en';

  selectedTheme = '';

  languages = [
    { name: 'English', code: 'en' },
    { name: 'Serbian', code: 'sr' },
  ];

  themes: string[] = [];

  handleOnLanguageChange = (code: string) => {
    this.translateService.use(code);
  };

  handleThemeChange = (theme: string) => {
    this.appThemeService.changeTheme(theme);
  };

  ngOnInit(): void {
    this.themes = this.appThemeService.getThemes();

    let theme = this.appThemeService.getLocalTheme();
    this.selectedTheme = theme;
    this.appThemeService.changeTheme(this.selectedTheme);
  }
}
