import { ActionResponse, FailResponse, SuccessResponse } from '~/app/models/types/action';
import { ApiException, UserResponse } from '../services/generated/user.generated';
import { updateUsersAccessRequest } from '../services/users.service';
import { json } from '@remix-run/node';
import { safeParse } from '@djeka07/utils';

export default async (accessToken: string, form: FormData): Promise<ActionResponse<UserResponse, ApiException>> => {
  try {
    const grantAccess = Boolean(form.get('access'));
    const userIds = safeParse<string[]>(form.get('userIds') as string) || [];
    const applicationIds = safeParse<string[]>(form.get('applicationIds') as string) || [];
    const response = updateUsersAccessRequest({ accessToken, form: { applicationIds, grantAccess, userIds } });
    return json(new SuccessResponse(response));
  } catch (error) {
    return json(new FailResponse(error), (error as ApiException).status);
  }
};
