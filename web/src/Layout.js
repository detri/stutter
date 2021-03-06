import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  OuterContainer,
  MainContainer,
  Logo,
  GlobalStyle,
  TopBar,
  ThemeButton,
  ThemeContainer,
  ThemeText
} from './Display';
import { ThemeProvider } from 'styled-components';
import { themeHelper } from './ThemeHelper';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import LoginOrRegister from './LoginOrRegister';

class Layout extends Component {
  state = {
    theme: themeHelper.themes[0].colors,
    themeName: themeHelper.themes[0].name
  }

  componentDidMount() {
    const theme = themeHelper.getSavedTheme();
    this.setState({
      theme: theme.colors,
      themeName: theme.name
    });
  }

  updateTheme = id => {
    themeHelper.updateTheme(id);
    themeHelper.saveSelectedTheme();
    const theme = themeHelper.getCurrentTheme();
    this.setState({
      theme: theme.colors,
      themeName: theme.name
    });
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <OuterContainer>
          <GlobalStyle />
          <Logo>stutter</Logo>
          <TopBar>
            <ThemeContainer>
              <ThemeText>
                {this.state.themeName}
              </ThemeText>
              {themeHelper.themes.map((t, i) => 
              <ThemeButton
                key={i}
                bg={t.colors.bg}
                border={t.colors.darken}
                onClick={() => this.updateTheme(i)}
              />)}
            </ThemeContainer>
            <LoginOrRegister />
          </TopBar>
          <MainContainer>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </MainContainer>
        </OuterContainer>
      </ThemeProvider>
    );
  }
}

export default Layout;