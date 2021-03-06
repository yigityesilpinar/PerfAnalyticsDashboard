import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
body, body > #root
{
  font-family: Roboto, 'Helvetica Neue', Helvetica, sans-serif;
  min-height: 100vh;
  margin: 0;
}
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}
[class*="col-"] {
  float: left;
  padding: 16px;
}
.row::after {
  content: "";
  clear: both;
  display: table;
}

.ant-select {
  width: 200px;
}

@media screen and (max-width: ${({ theme }) => theme.mobileBreakPoint}) {
  [class*="col-"] {
    padding: 16px 0;
    float: initial;
  }
  .ant-select {
    width: 100%;
  }
}
a.active  {
  *  {
    color: ${({ theme }) => theme.palette.primary.main};
  }
}
`

export default GlobalStyles
