import { Typography } from '@djeka07/ui';
import { useTranslation } from 'react-i18next';
import { ResetForm } from '~/auth/components/reset-forms';

const ResetView = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h1">{t('form:reset:title')}</Typography>
      <ResetForm />
    </>
  );
};

export default ResetView;
