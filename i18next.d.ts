import _ from 'i18next';
import common from '~/locales/en/common';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    defaultNS: 'common';
    resources: {
      common: typeof common;
    };
  }
}
