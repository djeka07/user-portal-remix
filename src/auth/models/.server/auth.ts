import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { Authorization, createToken } from '~/app/models/helpers/token';
import { loginRequest, refreshRequest } from '~/users/models/services/users.service';
import { sessionStorage } from './session';

export const authenticator = new Authenticator<Authorization>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const token = await loginRequest({
      email,
      password,
    });
    return createToken(token);
  }),
  'login',
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const token = String(form.get('token'));
    const refreshedToken = await refreshRequest({ token });
    return createToken(refreshedToken);
  }),
  'refresh',
);
