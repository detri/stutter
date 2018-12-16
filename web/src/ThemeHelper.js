class ThemeHelper {
  constructor() {
    this.themes = [
      {
        name: 'Stutter Grey (default)',
        colors: {
          bg: '#ccc',
          main: '#eae8e8',
          lighten: '#f3f3f3',
          darken: '#aaa'
        }
      },
      {
        name: 'Positively Pink',
        colors: {
          bg: '#ffbdd3',
          main: '#ffd7e4',
          lighten: '#fff0f5',
          darken: '#ffa4c2'
        }
      },
      {
        name: 'Gloriously Green',
        colors: {
          bg: '#77ab59',
          main: '#c9df8a',
          lighten: '#f0f7da',
          darken: '#36802d'
        }
      }
    ];
    this.currentTheme = 0;
  }

  updateTheme(id) {
    this.currentTheme = id;
  }

  getCurrentTheme() {
    return this.themes[this.currentTheme];
  }

  getTheme(id) {
    return this.themes[id];
  }

  saveSelectedTheme() {
    localStorage.setItem("stutterTheme", this.currentTheme.toString());
  }

  getSavedTheme() {
    const themeId = localStorage.getItem("stutterTheme");
    if (themeId) {
      return this.getTheme(parseInt(themeId));
    }
    return this.getTheme(0);
  }
}

export const themeHelper = new ThemeHelper();