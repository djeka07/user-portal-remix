import { Authorization } from '~/app/models/helpers/token';
import { authenticator } from './auth';
import { redirect } from '@remix-run/node';
import { isBefore } from '~/app/models/helpers/date';

export default async (request: Request): Promise<Authorization> => {
  try {
    const token = await authenticator.isAuthenticated(request);
    if (!token) {
      throw redirect('/login');
    }
    const isAuthenticated = isBefore(token.expires, Date.now());
    if (!isAuthenticated) {
      return authenticator.logout(request, { redirectTo: '/login' });
    }
    return token;
  } catch (error) {
    return authenticator.logout(request, { redirectTo: '/login' });
  }
};
