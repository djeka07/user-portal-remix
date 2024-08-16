import Link from '~/app/components/links/link';

import { useTranslation } from 'react-i18next';
import { Form } from '~/app/components/forms';
import { buttonWrapper, form, link } from './reset-form.css';
import resetFormSchema, { ResetFormData } from './reset-form.schema';
import { useForm } from '~/app/models/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Message, TextInput } from '@djeka07/ui';

const ResetForm = () => {
  const { t } = useTranslation();
  const [{ formState }, { handleSubmit, register }] = useForm<ResetFormData>({
    resolver: zodResolver(resetFormSchema),
  });
  return (
    <Form method="post" className={form} handleSubmit={handleSubmit}>
      <TextInput
        type="email"
        label={t('form:login:input:email:label')}
        placeholder={t('form:login:input:email:placeholder')}
        error={formState.errors?.email?.message ? t(formState.errors.email.message) : undefined}
        {...register('email')}
      />
      <Message show={formState.isSubmitSuccessful} success>
        {t('form:reset:success')}
      </Message>
      <div className={buttonWrapper}>
        <Button isLoading={formState.isSubmitting} type="submit">
          {t('form:reset:button')}
        </Button>
        <Link className={link} href="/login">
          {t('form:reset:link:login')}
        </Link>
      </div>
    </Form>
  );
};

export default ResetForm;
