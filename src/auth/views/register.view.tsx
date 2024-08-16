import { Typography } from '@djeka07/ui';
import { useTranslation } from 'react-i18next';
import { RegisterForm } from '~/auth/components/register-forms';

const RegisterView = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h1">{t('form:register:title')}</Typography>
      <RegisterForm />
    </>
  );
};

export default RegisterView;
