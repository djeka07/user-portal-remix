import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { useLocation } from '@remix-run/react';
import { getQueryParams } from '~/app/models/helpers/query';
import { FormErrors, validateSchema } from '~/app/models/helpers/schema';
import i18nServer from '~/app/models/server/i18n.server';
import { ActionResponse, FailResponse } from '~/app/models/types/action';
import { loginSchema } from '~/auth/components/login-forms/login-form.schema';
import { authenticator } from '~/auth/models/.server/auth';
import { LoginView } from '~/auth/views';

export const handle = { i18n: 'form' };

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    {
      property: 'og:title',
      content: data?.title,
    },
    {
      name: 'description',
      content: data?.description,
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await i18nServer.getFixedT(request);
  return {
    title: t('form:login:title'),
    description: t('form:login:description'),
  };
};

export const action = async ({ request }: ActionFunctionArgs): Promise<ActionResponse<never, FormErrors>> => {
  try {
    const formData = await request.clone().formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const redirectTo = String(formData.get('redirectTo'));
    const { isValid, formErrors } = validateSchema(loginSchema, { email, password });
    if (!isValid) {
      return json(new FailResponse(formErrors), 400);
    }

    return await authenticator.authenticate('login', request, {
      successRedirect: redirectTo,
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    return json(new FailResponse([]), 400);
  }
};

const LoginRoute = () => {
  const location = useLocation();
  return <LoginView redirectTo={getQueryParams(location.search)?.redirectTo as string} />;
};

export default LoginRoute;
