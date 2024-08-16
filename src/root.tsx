import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useRouteLoaderData,
} from '@remix-run/react';
import { useChangeLanguage } from 'remix-i18next/react';
import { useColorMode } from './app/models/hooks';
import i18nServer, { localeCookie } from './app/models/server/i18n.server';
import './app/styles/app.css';
import createTheme from '~/app/styles';
import { createStyleSheet } from '@djeka07/ui';

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])];

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  return json({ locale }, { headers: { 'Set-Cookie': await localeCookie.serialize(locale) } });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>('root');
  const [{ mode }] = useColorMode();
  return (
    <html lang={loaderData?.locale ?? 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {createStyleSheet(createTheme(mode))}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);
  return <Outlet />;
}
