import { useAuth } from '~/auth/models/hooks/use-auth';
import { UserForm } from '../user-form';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { UserActionIntent } from '~/users/models/enums/intents';

type UpdateUserFormContainerProps = {
  user: UserResponse;
  hideTitle?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const EditUserFormContainer = ({ user, hideTitle, onCancel, onSuccess }: UpdateUserFormContainerProps) => {
  const [state] = useAuth();
  const { t } = useTranslation();
  const form = useMemo(
    () =>
      !!user
        ? {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles.map((r) => r.id),
          }
        : undefined,
    [user],
  );

  return (
    <UserForm
      onCancel={onCancel}
      onSuccess={onSuccess}
      successText={t('form:user:success:update')}
      errorText={t('form:user:error:update')}
      submitText={t('common:button:update')}
      action={`/users/${user.id}`}
      intent={UserActionIntent.EDIT}
      form={form}
      roles={state.roles}
      title={hideTitle ? undefined : t('form:user:title:update')}
    />
  );
};

export default EditUserFormContainer;
