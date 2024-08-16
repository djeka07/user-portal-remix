import { UserForm } from '../user-form';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';
import { UserActionIntent } from '~/users/models/enums/intents';

type CreateUserContainerProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

const CreateUserFormContainer = ({ onCancel, onSuccess }: CreateUserContainerProps) => {
  const [state] = useAuth();
  const { t } = useTranslation();
  return (
    <UserForm
      title={t('form:user:title:create')}
      successText={t('form:user:success:create')}
      errorText={t('form:user:error:create')}
      submitText={t('common:button:create')}
      action="/users?index"
      intent={UserActionIntent.CREATE}
      onSuccess={onSuccess}
      onCancel={onCancel}
      roles={state.roles}
    />
  );
};

export default CreateUserFormContainer;
