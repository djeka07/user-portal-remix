import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditUserFormContainer } from '~/users/components/edit-user-form';
import { ResetUserPasswordContainer } from '~/users/components/reset-user-password';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { root } from './user-actions.css';
import { UserActionIntent } from '~/users/models/enums/intents';
import { EditPasswordForm } from '~/users/components/edit-password-form';
import { ActionButton, Match, PanelContainer, PanelContent, PanelSize, Switch } from '@djeka07/ui';

type Actions = undefined | UserActionIntent.EDIT | UserActionIntent.RESET | UserActionIntent.EDIT_PASSWORD;

type UserActionsProps = {
  user: UserResponse;
};

const UserActions = ({ user }: UserActionsProps) => {
  const { t } = useTranslation();
  const [selectedAction, setSelectedAction] = useState<Actions>();

  const onSuccess = useCallback((closePanel: () => void) => {
    setTimeout(() => closePanel(), 1000);
  }, []);

  return (
    <>
      <div className={root}>
        <ActionButton
          iconName="Edit"
          onClick={() => setSelectedAction(UserActionIntent.EDIT)}
          description={t('users:user-view:actions:edit:text')}
        >
          {t('users:user-view:actions:edit:title')}
        </ActionButton>
        <ActionButton
          iconName="Edit"
          onClick={() => setSelectedAction(UserActionIntent.EDIT_PASSWORD)}
          description={t('users:user-view:actions:edit-password:text')}
        >
          {t('users:user-view:actions:edit-password:title')}
        </ActionButton>
        <ActionButton
          iconName="Repeat"
          onClick={() => setSelectedAction(UserActionIntent.RESET)}
          description={t('users:user-view:actions:reset:text')}
        >
          {t('users:user-view:actions:reset:title')}
        </ActionButton>
      </div>
      {!!selectedAction && (
        <PanelContainer
          afterPanelClosed={() => setSelectedAction(undefined)}
          panelElementProps={{
            maxWidth: PanelSize.Xsmall,
            closeOnEscape: true,
          }}
        >
          {(panelProps) => (
            <Switch expression={selectedAction}>
              <Match when={UserActionIntent.EDIT}>
                <PanelContent title={t('form:user:title:update')}>
                  <EditUserFormContainer
                    user={user}
                    hideTitle
                    onCancel={() => panelProps.closePanel()}
                    onSuccess={() => onSuccess(panelProps.closePanel)}
                  />
                </PanelContent>
              </Match>
              <Match when={UserActionIntent.EDIT_PASSWORD}>
                <PanelContent title={t('form:user:title:update')}>
                  <EditPasswordForm
                    user={user}
                    onCancel={() => panelProps.closePanel()}
                    onSuccess={() => onSuccess(panelProps.closePanel)}
                  />
                </PanelContent>
              </Match>
              <Match when={UserActionIntent.RESET}>
                <PanelContent background="dark" centerContent>
                  <ResetUserPasswordContainer user={user} onClose={panelProps.closePanel} />
                </PanelContent>
              </Match>
            </Switch>
          )}
        </PanelContainer>
      )}
    </>
  );
};

export default UserActions;
