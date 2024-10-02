import { ProgressState } from '~/app/models/types/fetch.state';

import { useFetcher, useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { action } from '~/routes/_auth._index';
import AuthRefresh from './auth-refresh';
import { AuthActionIntent } from '~/auth/models/enums/intent.enum';
import { Authorization } from '~/app/models/helpers/token';
import { createFormData } from '@djeka07/utils';
import { createDate } from '@djeka07/dates';

const AuthRefreshContainer = () => {
  const [state, { updateToken }] = useAuth();
  const fetcher = useFetcher<typeof action>();
  const fetcherData = fetcher?.data as Authorization;
  const location = useLocation();

  const [progress, setProgress] = useState<ProgressState<{ show: boolean }>>({
    state: 'initial',
    data: { show: false },
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (fetcher.state === 'idle' && fetcherData?.refreshToken) {
      setProgress((prev) => ({ ...prev, state: 'ready' }));
      timeout = setTimeout(() => {
        setProgress((prev) => ({ ...prev, data: { show: false } }));
      }, 3000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [fetcher.state]);

  useEffect(() => {
    if (fetcher.data) {
      updateToken(fetcherData);
    }
  }, [fetcherData?.accessToken]);

  const refreshToken = async (token: string) => {
    setProgress((prev) => ({ ...prev, data: { show: true }, state: 'pending' }));
    const formData = createFormData({
      token,
      intent: AuthActionIntent.REFRESH,
      redirectTo: location.pathname,
    });
    fetcher.submit(formData, { action: '/?index', method: 'POST' });
  };

  useEffect(() => {
    const interval = setInterval(
      async () => {
        const expires = createDate(state.token?.expires).subtract(
          parseInt(import.meta.env.VITE_AUTH_SUBSTRACT_MS, 10),
          'milliseconds',
        );
        if (createDate().isAfter(expires)) {
          await refreshToken(state.token!.refreshToken);
        }
      },
      parseInt(import.meta.env.VITE_AUTH_CHECK_INTERVAL_MS, 10),
    );
    return () => {
      clearInterval(interval);
    };
  }, [state?.token?.refreshToken]);

  return (
    <AuthRefresh
      state={progress.state}
      show={progress.data?.show || false}
      onClose={() => setProgress((p) => ({ ...p, data: { show: false } }))}
    />
  );
};

export default AuthRefreshContainer;
