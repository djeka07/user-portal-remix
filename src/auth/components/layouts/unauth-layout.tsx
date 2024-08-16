import { Message } from '@djeka07/ui';
import { useTranslation } from 'react-i18next';
import ThemeContainer from '~/app/components/themes/theme.container';
import { formWrapper, main, message, themeContainer } from './unauth-layout.css';

type LayoutProps = { children: JSX.Element | JSX.Element[]; reason?: string };

const UnauthLayout = ({ children, reason }: LayoutProps) => {
  const { t } = useTranslation();
  const reasonLabel = t(`label:${reason}`);
  return (
    <div className={main}>
      <Message className={message} icon="AlertTriangle" warning show={!!reason && reasonLabel !== reason}>
        {reasonLabel}
      </Message>
      <div className={formWrapper}>
        <ThemeContainer size="xxlarge" className={themeContainer} />
        {children}
      </div>
    </div>
  );
};

export default UnauthLayout;
