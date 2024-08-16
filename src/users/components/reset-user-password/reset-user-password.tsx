import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { Form } from '~/app/components/forms';
import { useForm } from '~/app/models/hooks';
import { Response } from '~/app/models/types/action';
import { UserActionIntent } from '~/users/models/enums/intents';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { buttonWrapper, contentWrapper, root } from './reset-user-password.css';
import { Button, Icon, Typography } from '@djeka07/ui';

type ResetUserPasswordProps = {
  action: string;
  user: UserResponse;
  onSuccess?: () => void;
  onCancel?: () => void;
};

type Form = {
  intent: string;
};

const ResetUserPassword = ({ action, onCancel, onSuccess, user }: ResetUserPasswordProps) => {
  const [{ data }, { handleSubmit, register }] = useForm<Form, Response>({
    fetcher: useFetcher(),
    submitConfig: { action },
  });

  useEffect(() => {
    if (onSuccess && !!data?.ok) {
      onSuccess();
    }
  }, [onSuccess, data?.ok]);

  return (
    <div className={root}>
      <Icon name="Repeat" size="xxlarge" color="heading" padding="medium" radius="round" background="light" />
      <div className={contentWrapper}>
        <Typography align="center" variant="h3">
          Reset password
        </Typography>
        <Typography align="center" fontStyle="italic" variant="label">
          Are you sure you want to reset password for {user.firstName} {user.lastName}?
        </Typography>
      </div>
      <Form action={action} handleSubmit={handleSubmit}>
        <input type="hidden" {...register('intent')} value={UserActionIntent.RESET} />
        <div className={buttonWrapper}>
          <Button success type="submit">
            Ok
          </Button>
          {!!onCancel && (
            <Button error outlined onClick={onCancel}>
              Close
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default ResetUserPassword;
