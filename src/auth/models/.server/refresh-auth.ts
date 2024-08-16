import { Authorization, createToken } from '~/app/models/helpers/token';
import { refreshRequest } from '~/users/models/services/users.service';
import { commitSession, getSession } from './session';
import { authenticator } from './auth';
import { JsonFunction, TypedResponse, json, redirect } from '@remix-run/node';

export default async (request: Request): Promise<TypedResponse<Authorization>> => {
  const formData = await request.clone().formData();
  const redirectTo = formData.get('redirectTo');
  try {
    const token = String(formData.get('token'));
    const refreshedToken = await refreshRequest({ token });
    const response = createToken(refreshedToken);
    let session = await getSession(request.headers.get('cookie'));
    session.set(authenticator.sessionKey, response);
    let headers = new Headers({ 'Set-Cookie': await commitSession(session) });
    return json(response, { headers });
  } catch {
    return await authenticator.logout(request, { redirectTo: `/login?forcedLoggedOut=true&redirectTo=${redirectTo}` });
  }
};
