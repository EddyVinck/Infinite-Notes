import colors from './colors';

export default `
body {
  background-color: #f2f2f2;
  color: ${colors.black};
  font-family: sans-serif;
  margin: 0;
}
* {
  box-sizing: border-box;
  font-family: sans-serif;
}
h1 {
  font-size: 60px;
}
h2 {
  font-size: 40px;
}
h1, h2, h3, h4, h5, h6, p, ul, li, blockquote {
  margin-top: 0;
}
#modal-root {
  position: relative;
  z-index: 999;
}
`;
