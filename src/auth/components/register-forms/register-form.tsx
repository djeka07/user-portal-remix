import Link from '~/app/components/links/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Form } from '~/app/components/forms';
import { FormErrors } from '~/app/models/helpers/schema';
import { useForm } from '~/app/models/hooks';
import { FailResponse } from '~/app/models/types/action';
import { ErrorResponse } from '~/users/models/services/generated/user.generated';
import { buttonWrapper, form, inputs, link } from './register-form.css';
import registerFormSchema, { RegisterFormData } from './register-form.schema';
import { Button, Message, TextInput } from '@djeka07/ui';

const RegisterForm = () => {
  const { t } = useTranslation();
  const [{ formState, data }, { handleSubmit, register }] = useForm<
    RegisterFormData,
    FailResponse<FormErrors | ErrorResponse>
  >({
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <Form className={form} method="post" handleSubmit={handleSubmit}>
      <div className={inputs}>
        <TextInput
          type="email"
          autoComplete="email"
          label={t('form:login:input:email:label')}
          placeholder={t('form:login:input:email:placeholder')}
          error={formState.errors?.email?.message ? `${t(formState.errors.email.message)}` : undefined}
          {...register('email')}
        />
        <TextInput
          type="text"
          autoComplete="firstname"
          label={t('form:register:input:first-name:label')}
          placeholder={t('form:register:input:first-name:placeholder')}
          error={formState.errors?.firstName?.message ? `${t(formState.errors.firstName.message)}` : undefined}
          {...register('firstName')}
        />
        <TextInput
          type="text"
          autoComplete="lastname"
          label={t('form:register:input:last-name:label')}
          placeholder={t('form:register:input:last-name:placeholder')}
          error={formState.errors?.lastName?.message ? `${t(formState.errors.lastName.message)}` : undefined}
          {...register('lastName')}
        />
        <TextInput
          type="password"
          autoComplete="new-password"
          label={t('form:login:input:password:label')}
          placeholder={t('form:login:input:password:placeholder')}
          error={formState.errors?.password?.message ? `${t(formState.errors.password.message)}` : undefined}
          {...register('password')}
        />
        <TextInput
          type="password"
          autoComplete="new-password"
          label={t('form:register:input:confirm-password:label')}
          placeholder={t('form:register:input:confirm-password:placeholder')}
          error={
            formState.errors?.confirmPassword?.message ? `${t(formState.errors.confirmPassword.message)}` : undefined
          }
          {...register('confirmPassword')}
        />
      </div>
      <Message error show={!!data?.errors?.['x-request-id']}>
        {t('form:register:error', { requestId: data?.errors?.['x-request-id'] })}
      </Message>
      <Message success show={!!data?.ok}>
        {t('form:register:success')}
      </Message>
      <div className={buttonWrapper}>
        <Button isLoading={formState.isSubmitting} type="submit">
          {t('form:register:button')}
        </Button>
        <Link className={link} href="/login">
          {t('form:reset:link:login')}
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
