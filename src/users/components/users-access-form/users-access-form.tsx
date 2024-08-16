import { Await } from '@remix-run/react';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '~/app/components/forms';
import { GetApplicationsResponse, UsersResponse } from '~/users/models/services/generated/user.generated';
import { ApplicationFormPart } from './components/applications-form-part';
import { UsersFormPart } from './components/users-form-part';
import { buttonWrapper } from './users-access-form.css';
import { Skeleton } from '~/app/components/lists';
import { UserFormData, usersFormSchema } from './users-access-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from '~/app/models/hooks';
import { Button } from '@djeka07/ui';

type UserAccessListProps = {
  users: Promise<UsersResponse>;
  applicatons: Promise<GetApplicationsResponse>;
  selectedApplications?: string[];
  onSuccess?: () => void;
};

const action = '/users/access';

const UserAccessForm = ({ applicatons, users }: UserAccessListProps): JSX.Element => {
  const { t } = useTranslation();
  const [{ formState }, { handleSubmit, register, setValue }] = useForm<UserFormData>({
    resolver: zodResolver(usersFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    submitConfig: { action },
    defaultValues: { access: true, userIds: [], applicationIds: [] },
  });

  useEffect(() => {
    console.log(formState.errors);
  }, [formState]);

  return (
    <div>
      <Form action={action} handleSubmit={handleSubmit}>
        <input {...register('access')} type="hidden" />
        <Suspense fallback={<Skeleton amount={3} height="26px" width="100px" />}>
          <Await resolve={applicatons}>
            {(applicationResponse) => (
              <ApplicationFormPart
                register={register}
                applications={applicationResponse?.applications}
                errors={formState.errors}
                setValue={setValue}
              />
            )}
          </Await>
        </Suspense>
        <Suspense fallback={<Skeleton amount={3} height="26px" width="100px" />}>
          <Await resolve={users}>
            {(userResponse) => (
              <UsersFormPart register={register} setValue={setValue} errors={formState.errors} users={userResponse} />
            )}
          </Await>
        </Suspense>
        <div className={buttonWrapper}>
          <Suspense
            fallback={
              <Button size="small" isLoading disabled>
                {t('common:button:update')}
              </Button>
            }
          >
            <Await resolve={Promise.all([users, applicatons])}>
              {([userResponse]) => (
                <Button size="small" disabled={userResponse.total <= 0} type="submit">
                  {t('common:button:update')}
                </Button>
              )}
            </Await>
          </Suspense>
        </div>
      </Form>
    </div>
  );
};

export default UserAccessForm;
