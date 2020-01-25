import { Injectable } from '@angular/core';

export const whiteTheme = {
  'gradient': 'linear-gradient(to right, rgb(255, 153, 102), rgb(255, 94, 98))',
  'background': '#d8d8d8',
  'background-lighter': '#f2f2f2',
  'background-darker': '#bfbfbf',
  'text-color-normal': '#141414',
  'text-color-lighter': '#3a3a3a',
  'text-color-darker': '#000000',
  'highlight-lighter': '#3a3a3a',
  'highlight': '#141414',
  'highlight-darker': '#000000',
}

export const darkTheme = {
  'gradient': 'linear-gradient(to right, rgb(15, 32, 39), rgb(32, 58, 67), rgb(44, 83, 100))',
  'background': '#141414',
  'background-darker': '#000000',
  'background-lighter': '#3a3a3a',
  'text-color-lighter': '#f2f2f2',
  'text-color-normal': '#d8d8d8',
  'text-color-darker': '#bfbfbf',
  'highlight-lighter': '#f8434c',
  'highlight': '#cc2f08',
  'highlight-darker': '#9b060e',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  toggleWhite() {
    this.setTheme(whiteTheme);
  }

  toggleDark() {
    this.setTheme(darkTheme);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
