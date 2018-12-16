import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
import { Link } from 'react-router-dom';

const jiggle = keyframes`
  0% {
    transform: rotate(-3deg)
  }
  20% {
    transform: rotate(-8deg)
  }
  40% {
    transform: rotate(0deg)
  }
  60% {
    transform: rotate(3deg)
  }
  80% {
    transform: rotate(8deg)
  }
  100% {
    transform: rotate(0deg)
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => props.theme.bg};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

export const defaultTheme = {
  bg: '#ccc',
  main: '#eae8e8',
  lighten: '#f3f3f3',
  darken: '#aaa'
};

export const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.bg};
`;

export const MainContainer = styled.div`
  box-sizing: border-box;
  border-radius: 3px;
  margin: 1.5em auto;
  width: 66vw;
  padding: 1.5em;
  background-color: ${props => props.theme.main};
  box-shadow: 0px 2px 2px grey;
`;

export const Logo = styled.h1`
  text-align: center;
  margin-top: 0;
`;

export const TopBar = styled.div`
  box-sizing: border-box;
  height: 1em;
  width: 66vw;
  margin: 0 auto;
`;

export const ThemeContainer = styled.div`
  float: left;
`;

export const ThemeText = styled.p`
  margin: 0;
`;

export const ThemeButton = styled.button`
  border: none;
  background: ${props => props.bg};
  border: 1px solid ${props => props.border};
  height: 1em;
  width: 1em;
  margin-right: 0.5em;
`;

export const LoginStatus = styled.div`
  text-align: right;
  float: right;
`;

const LinkStyle = css`
  color: black;
  font-weight: bold;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export const StyledLink = styled.button`
  border: none;
  background: none;
  ${LinkStyle}
`;

export const RouterLink = styled(Link)`
  ${LinkStyle}
`;

export const NewPostBox = styled.textarea`
  width: 90%;
  box-sizing: border-box;
  padding: 1.5em;
  height: 100px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  outline: none;
  resize: none;
  border: 1px solid #aaa;
  border-right: none;
`;

export const SubmitPost = styled.button`
  box-sizing: border-box;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  border: 1px solid #aaa;
  outline: none;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  width: 10%;
  height: 100px;
  vertical-align: top;
  border-left: none;
  font-size: 3em;
  text-align: center;
  transition: background-color 0.25s;
  cursor: pointer;

  :hover {
    transition: background-color 0.5s;
    background-color: ${props => props.theme.lighten};
  }

  :active {
    background-color: ${props => props.theme.darken};
  }
`;

export const PageButton = styled.button`
  border: none;
  outline: none;
  background: ${props => props.theme.bg};
  font-size: 16pt;

  ${props => props.left &&
    `border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;`
  }

  ${props => props.right &&
    `border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;`
  }

  ${props => props.active &&
    `background: ${props.theme.darken};`
  }
`;

export const PostContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 1.5em;
  padding-left: 1.5em;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
`;

export const PostContent = styled.p`
  width: 80%;
`;

export const PostDate = styled.p`
  font-size: 12px;
`;

export const Votes = styled.div``;

export const ThumbsButton = styled.button`
  cursor: pointer;
  width: 25%;
  font-size: 24px;
  border: none;
  transition: background-color 0.5s;
  background: none;

  :hover {
    transition: background-color 0.5s;
    background-color: ${props => props.theme.lighten};
  }

  svg {
    padding: 5px;
  }

  :hover svg {
    animation: ${jiggle} 0.2s;
    animation-iteration-count: 2;
  }

  ${props => props.up &&
    `margin-left: 25%;
    border-right: none;
    border-top-left-radius: 3px;
    color: green;`}

  ${props => props.down &&
    `margin-right: 25%;
    border-left: none;
    border-top-right-radius: 3px;
    color: darkred;`}
`;