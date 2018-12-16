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
      }
    ];
    this.currentTheme = this.themes[0].colors;
    this.currentThemeName = this.themes[0].name;
  }

  updateTheme(id) {
    this.currentTheme = this.themes[id].colors;
    this.currentThemeName = this.themes[id].name;
  }
}

export const themeHelper = new ThemeHelper();