import { css } from 'react-emotion';
import breakpoints from './breakpoints';

const contentWrapper = css`
  margin: 0 auto;
  max-width: 1170px;

  @media (max-width: 1220px) {
    max-width: 90%;
  }
  ${breakpoints.mobileDown} {
    margin: 0 5%;
  }
`;

const sectionPadding = {
  standard: css`
    padding-top: 60px;
    padding-bottom: 40px;
  `,
};

export { contentWrapper, sectionPadding };
