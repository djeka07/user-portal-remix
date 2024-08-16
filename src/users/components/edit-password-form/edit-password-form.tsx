import { Form } from '~/app/components/forms';
import editPasswordFormSchema, { EditPasswordFormData } from './edit-password-form.schema';
import { useForm } from '~/app/models/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher } from '@remix-run/react';
import { UserActionIntent } from '~/users/models/enums/intents';
import { useTranslation } from 'react-i18next';
import { root } from '../user-form/user-form.css';
import { buttonWrapper } from './edit-password-form.css';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { Button, TextInput } from '@djeka07/ui';
type EditPasswordFormProps = {
  action?: string;
  user: UserResponse;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const EditPasswordForm = ({ user, action: formAction, onCancel }: EditPasswordFormProps) => {
  const action = formAction || `/users/${user.id}`;
  const { t } = useTranslation();
  const [{ formState, data }, { handleSubmit, register }] = useForm<EditPasswordFormData>({
    resolver: zodResolver(editPasswordFormSchema),
    submitConfig: { action },
    defaultValues: { intent: UserActionIntent.EDIT_PASSWORD },
    fetcher: useFetcher(),
  });

  return (
    <Form className={root} action={action} handleSubmit={handleSubmit}>
      <input type="hidden" {...register('intent')} />
      <TextInput
        autoComplete="username"
        name="email"
        disabled
        label={t('form:login:input:email:label')}
        type="email"
        value={user.email}
      />
      <TextInput
        autoComplete="current-password"
        type="password"
        label={t('form:update-password:input:current-password:label')}
        placeholder={t('form:update-password:input:current-password:placeholder')}
        {...register('currentPassword')}
      />
      <TextInput
        autoComplete="new-password"
        type="password"
        label={t('form:login:input:password:label')}
        placeholder={t('form:login:input:password:placeholder')}
        {...register('password')}
      />
      <TextInput
        autoComplete="new-password"
        type="password"
        label={t('form:register:input:confirm-password:label')}
        placeholder={t('form:register:input:confirm-password:placeholder')}
        {...register('confirmPassword')}
      />
      <div className={buttonWrapper}>
        <Button success>{t('common:button:update')}</Button>
        <Button onClick={onCancel} error outlined>
          {t('common:button:cancel')}
        </Button>
      </div>
    </Form>
  );
};

export default EditPasswordForm;
