import { useTranslation } from 'react-i18next';
import { LoginForm } from '../components/login-forms';
import { Typography } from '@djeka07/ui';

type LoginViewProps = {
  redirectTo?: string;
};

const LoginView = ({ redirectTo }: LoginViewProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h1">{t('form:login:title')}</Typography>
      <LoginForm redirectTo={redirectTo} />
    </>
  );
};

export default LoginView;
