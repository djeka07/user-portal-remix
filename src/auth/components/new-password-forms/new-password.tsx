import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '~/app/components/forms';
import { useForm } from '~/app/models/hooks';
import { Response } from '~/app/models/types/action';
import { form } from './new-password.css';
import newPasswordSchema, { NewPasswordData } from './new-password.schema';
import { Button, Message, TextInput } from '@djeka07/ui';

type NewPasswordFormProps = {
  email: string;
};

const NewPasswordForm = ({ email }: NewPasswordFormProps) => {
  const [{ formState, data }, { handleSubmit, register }] = useForm<NewPasswordData, Response>({
    resolver: zodResolver(newPasswordSchema),
    fetcher: useFetcher(),
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (!!data?.ok) {
      console.log('done');
    }
  }, [data?.ok]);

  return (
    <Form className={form} handleSubmit={handleSubmit}>
      <TextInput
        autoComplete="username"
        name="email"
        disabled
        label={t('form:login:input:email:label')}
        type="email"
        value={email}
      />
      <TextInput
        label={t('form:login:input:password:label')}
        placeholder={t('form:login:input:password:placeholder')}
        autoComplete="new-password"
        {...register('password')}
        error={formState.errors?.password?.message ? t(formState.errors.password.message) : undefined}
        type="password"
      />
      <TextInput
        label={t('form:register:input:confirm-password:label')}
        placeholder={t('form:register:input:confirm-password:placeholder')}
        autoComplete="new-password"
        {...register('confirmPassword')}
        error={formState.errors?.confirmPassword?.message ? t(formState.errors.confirmPassword.message) : undefined}
        type="password"
      />
      {!data?.ok ? (
        <Button type="submit">{t('common:button:confirm')}</Button>
      ) : (
        <Message success>Lösenorden är nu återställt</Message>
      )}
    </Form>
  );
};

export default NewPasswordForm;
