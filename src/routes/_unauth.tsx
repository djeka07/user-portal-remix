import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Outlet, useSearchParams } from '@remix-run/react';
import { UnauthLayout } from '~/auth/components/layouts';
import getAuthentication from '~/auth/models/.server/get-authentication';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const token = await getAuthentication(request);
    if (token) {
      return redirect('/');
    }
    return null;
  } catch (error) {
    return null;
  }
};

const UnAuthLayout = () => {
  const [search] = useSearchParams();
  const reason = search.get('reason');
  return (
    <>
      <UnauthLayout reason={reason || undefined}>
        <Outlet />
      </UnauthLayout>
    </>
  );
};

export default UnAuthLayout;
