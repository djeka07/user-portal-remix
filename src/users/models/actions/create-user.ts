import { json } from '@remix-run/node';
import { ActionResponse, FailResponse, SuccessResponse } from '~/app/models/types/action';
import { ApiException, UserResponse } from '../services/generated/user.generated';
import { createUserRequest } from '../services/users.service';
import { safeParse } from '@djeka07/utils';

export default async (accessToken: string, form: FormData): Promise<ActionResponse<UserResponse, ApiException>> => {
  try {
    const firstName = String(form.get('firstName'));
    const lastName = String(form.get('lastName'));
    const email = String(form.get('email'));
    const roles =
      safeParse<(string | boolean)[]>(form.get('roles') as string)?.filter<string>(
        (f): f is string => typeof f === 'string',
      ) || [];
    const roleIds = roles?.map((roleId) => ({ roleId }));
    const response = await createUserRequest({ accessToken, form: { firstName, lastName, email, roles: roleIds } });
    return json(new SuccessResponse(response));
  } catch (error) {
    return json(new FailResponse(error), (error as ApiException).status);
  }
};
