import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Link } from '~/app/components/links';
import { FormErrors } from '~/app/models/helpers/schema';
import { useForm } from '~/app/models/hooks';
import { FailResponse } from '~/app/models/types/action';
import { LoginFormData, loginSchema } from './login-form.schema';
import { buttonWrapper, form, link, linkWrapper, message } from './login.form.css';
import { Form } from '~/app/components/forms';
import { Button, Message, TextInput } from '@djeka07/ui';

type LoginFormProps = {
  redirectTo?: string;
  action?: string;
};

const LoginForm = ({ action, redirectTo }: LoginFormProps) => {
  const { t } = useTranslation();
  const [{ formState, data }, { handleSubmit, register }] = useForm<LoginFormData, FailResponse<FormErrors>>({
    resolver: zodResolver(loginSchema),
    reValidateMode: 'onChange',
    defaultValues: { redirectTo: redirectTo ?? '/' },
  });

  return (
    <Form className={form} action="/login" method="post" handleSubmit={handleSubmit}>
      <TextInput type="hidden" {...register('redirectTo')} />
      <TextInput
        type="text"
        autoComplete="email"
        label={t('form:login:input:email:label')}
        placeholder={t('form:login:input:email:placeholder')}
        error={formState.errors?.email?.message ? t(formState.errors.email.message) : undefined}
        {...register('email')}
      />
      <TextInput
        type="password"
        label={t('form:login:input:password:label')}
        autoComplete="current-password"
        placeholder={t('form:login:input:password:placeholder')}
        error={formState.errors?.password?.message ? t(formState.errors.password.message) : undefined}
        {...register('password')}
      />
      <Message className={message} icon="AlertTriangle" error show={data?.ok === false}>
        {t('form:login:error')}
      </Message>
      <div className={buttonWrapper}>
        <Button isLoading={formState.isSubmitting} type="submit">
          {t('common:button:login')}
        </Button>
        <div className={linkWrapper}>
          <Link className={link} href="/register">
            {t('form:login:link:not-a-user')}
          </Link>
          <Link className={link} href="/reset">
            {t('form:login:link:forgot')}
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
