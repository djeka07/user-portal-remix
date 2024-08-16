import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/auth/models/.server/auth';
import refreshAuth from '~/auth/models/.server/refresh-auth';
import { AuthActionIntent } from '~/auth/models/enums/intent.enum';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();
  if (formData.get('intent') === AuthActionIntent.REFRESH) {
    return refreshAuth(request);
  }
  return authenticator.logout(request, {
    redirectTo: '/login',
  });
};

export const loader = () => {
  return redirect('/users');
};
