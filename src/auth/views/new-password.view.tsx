import { Typography } from '@djeka07/ui';
import { NewPasswordForm } from '../components/new-password-forms';
import { useTranslation } from 'react-i18next';

type NewPasswordViewProps = {
  resetToken: string;
  email: string;
};

const NewPasswordView = ({ resetToken, email }: NewPasswordViewProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h1">{t('form:new-password:title')}</Typography>
      <Typography variant="body">{t('form:new-password:description')}</Typography>
      <NewPasswordForm email={email} />
    </>
  );
};
export default NewPasswordView;
