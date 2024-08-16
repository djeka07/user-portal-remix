import { Theme } from '@djeka07/ui';

export default (theme: Theme) => {
  return (
    <style>
      {`
  :root {
    --white-common-color: ${theme.palette.common.white};
    --black-common-color: ${theme.palette.common.black};

    --light-primary-color: ${theme.palette.primary.light};
    --main-primary-color: ${theme.palette.primary.main};
    --dark-primary-color: ${theme.palette.primary.dark};

    --light-background-color: ${theme.palette.background.light};
    --main-background-color: ${theme.palette.background.main};
    --dark-background-color: ${theme.palette.background.dark};

    --main-box-shadow: ${theme.palette.boxShadow.main};

    --100-grey-color: ${theme.palette.grey[100]};
    --200-grey-color: ${theme.palette.grey[200]};
    --300-grey-color: ${theme.palette.grey[300]};
    --400-grey-color: ${theme.palette.grey[400]};
    --500-grey-color: ${theme.palette.grey[500]};
    --600-grey-color: ${theme.palette.grey[600]};
    --700-grey-color: ${theme.palette.grey[700]};
    --800-grey-color: ${theme.palette.grey[800]};
    --900-grey-color: ${theme.palette.grey[900]};

    --light-input-color: ${theme.palette.input.light};
    --main-input-color: ${theme.palette.input.main};
    --dark-input-color: ${theme.palette.input.dark};

    --light-focus-color: ${theme.palette.focus.light};
    --main-focus-color: ${theme.palette.focus.main};
    --dark-focus-color: ${theme.palette.focus.dark};

    --light-heading-color: ${theme.palette.heading.light};
    --main-heading-color: ${theme.palette.heading.main};
    --dark-heading-color: ${theme.palette.heading.dark};

    --light-text-color: ${theme.palette.text.light};
    --main-text-color: ${theme.palette.text.main};
    --dark-text-color: ${theme.palette.text.dark};


    --light-success-color: ${theme.palette.success.light};
    --main-success-color: ${theme.palette.success.main};
    --dark-success-color: ${theme.palette.success.dark};


    --light-info-color: ${theme.palette.info.light};
    --main-info-color: ${theme.palette.info.main};
    --dark-info-color: ${theme.palette.info.dark};

    --light-warning-color: ${theme.palette.warning.light};
    --main-warning-color: ${theme.palette.warning.main};
    --dark-warning-color: ${theme.palette.warning.dark};

    --light-error-color: ${theme.palette.error.light};
    --main-error-color: ${theme.palette.error.main};
    --dark-error-color: ${theme.palette.error.dark};

    --light-link-color: ${theme.palette.link.light};
    --main-link-color: ${theme.palette.link.main};
    --dark-link-color: ${theme.palette.link.dark};

    --base-font-family: ${theme.typography.family.body};
    --heading-font-family: ${theme.typography.family.heading}

    --xxsmall-font-size: ${theme.typography.size.xxsmall};
    --xsmall-font-size: ${theme.typography.size.xsmall};
    --small-font-size:${theme.typography.size.small};
    --normal-font-size: ${theme.typography.size.normal};
    --medium-font-size: ${theme.typography.size.medium};
    --large-font-size:${theme.typography.size.large};
    --xlarge-font-size: ${theme.typography.size.xlarge};
    --xxlarge-font-size: ${theme.typography.size.xxlarge};
    --xxxlarge-font-size: ${theme.typography.size.xxxlarge};

    --light-font-weight: ${theme.typography.weight.light};
    --regular-font-weight: ${theme.typography.weight.regular};
    --bold-font-weight: ${theme.typography.weight.bold};

    --small-border-radius: ${theme.border.radius.small};
    --medium-border-radius:  ${theme.border.radius.medium};
    --large-border-radius:  ${theme.border.radius.large};
    --xlarge-border-radius:  ${theme.border.radius.xlarge};
    --xxlarge-border-radius:  ${theme.border.radius.xxlarge};
    --round-border-radius:  ${theme.border.radius.round};
  }

  html {
      background-color: var(--dark-background-color);
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      text-size-adjust: 100%;
    }
      h1, h2,h3,h4, h5, h6 {
        font-family: ${theme.typography.family.heading};
      }
      body {
        font-family: ${theme.typography.family.body};
      }
      ${theme.typography.fontFace.map(
        (fontFace) => `
          @font-face {
            font-family: ${fontFace.family};
            src: ${fontFace.src.map((src) => `url(${src.url}) format(${src.format})`).join(', ')};
            font-weight: ${fontFace.weight};
            font-style: ${fontFace.style};
            font-display: ${fontFace.display};
          }  
      `,
      )}
  `}
    </style>
  );
};
