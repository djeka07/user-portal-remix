import { RemixBrowser } from '@remix-run/react';
import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { getInitialNamespaces } from 'remix-i18next/client';
import * as i18n from '~/app/models/helpers/i18n';
import { PanelsProvider } from '@djeka07/ui';
import { ColorModeProvider } from './app/models/contexts/color-mode.context';

async function hydrate() {
  await (i18next as any)
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init({
      ...i18n,
      ns: getInitialNamespaces(),
      detection: {
        order: ['htmlTag'],
        caches: [],
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <ColorModeProvider initial="dark">
          <PanelsProvider>
            <RemixBrowser />
          </PanelsProvider>
        </ColorModeProvider>
      </I18nextProvider>,
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
