import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateUserFormContainer } from '../create-user-form';
import { root, wrapper } from './create-user-item.css';
import { Button, Icon, PanelContainer, PanelContent, PanelSize, Typography } from '@djeka07/ui';

const CreateUserItem = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={root}>
        <div className={wrapper}>
          <Icon color="heading" size="xxlarge" name="UserPlus" />
          <Typography variant="h3">{t('form:user:title:create')}</Typography>
          <Button label={t('common:button:create')} onClick={() => setShow(true)}>
            {t('common:button:create')}
          </Button>
        </div>
      </div>
      {show && (
        <PanelContainer panelElementProps={{ maxWidth: PanelSize.Xsmall }} afterPanelClosed={() => setShow(false)}>
          {(props) => (
            <PanelContent>
              <CreateUserFormContainer onSuccess={() => props.closePanel()} onCancel={() => props.closePanel()} />
            </PanelContent>
          )}
        </PanelContainer>
      )}
    </>
  );
};

export default CreateUserItem;
