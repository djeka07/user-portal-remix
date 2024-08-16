import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '~/app/components/forms';
import { useForm } from '~/app/models/hooks';
import { Response } from '~/app/models/types/action';
import { RoleResponse } from '../../models/services/generated/user.generated';
import { buttonWrapper, error, formClass, root } from './user-form.css';
import { userFormSchema } from './user-form.schema';
import { isEmpty } from '@djeka07/utils';
import { Button, Checkbox, For, Icon, Match, Message, Switch, TextInput, Typography } from '@djeka07/ui';

type Form = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roles?: string[];
};

type UserFormProps = {
  action: string;
  intent: string;
  roles?: RoleResponse[];
  title?: string;
  submitText: string;
  successText: string;
  errorText: string;
  form?: Form;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const UserForm = ({
  action,
  submitText,
  successText,
  errorText,
  form,
  intent,
  onCancel,
  onSuccess,
  roles,
  title,
}: UserFormProps): JSX.Element => {
  const { t } = useTranslation();
  const [{ formState, data }, { handleSubmit, register }] = useForm<Form & { intent: string }, Response>({
    fetcher: useFetcher(),
    resolver: zodResolver(userFormSchema),
    submitConfig: { action },
    defaultValues: form,
  });

  useEffect(() => {
    if (onSuccess && !!data?.ok) {
      onSuccess();
    }
  }, [data?.ok, onSuccess]);

  return (
    <div className={root}>
      {!!title && (
        <Typography weight="bold" variant="h2">
          {title}
        </Typography>
      )}
      <Form className={formClass} action={action} handleSubmit={handleSubmit}>
        <input {...register('intent')} type="hidden" value={intent} />
        <TextInput
          type="text"
          backgroundColor="light"
          defaultValue={form?.firstName}
          autoComplete="firstname"
          label={t('form:user:input:firstName:label')}
          placeholder={t('form:user:input:firstName:placeholder')}
          error={formState.errors?.firstName?.message ? `${t(formState.errors.firstName.message)}` : undefined}
          {...register('firstName')}
        />
        <TextInput
          type="text"
          backgroundColor="light"
          autoComplete="lastname"
          defaultValue={form?.lastName}
          label={t('form:user:input:lastName:label')}
          placeholder={t('form:user:input:lastName:placeholder')}
          error={formState.errors?.lastName?.message ? `${t(formState.errors.lastName.message)}` : undefined}
          {...register('lastName')}
        />
        <TextInput
          backgroundColor="light"
          type="text"
          autoComplete="email"
          defaultValue={form?.email}
          label={t('form:login:input:email:label')}
          placeholder={t('form:login:input:email:placeholder')}
          error={formState.errors?.email?.message ? t(formState.errors.email.message) : undefined}
          {...register('email')}
        />
        {!!form?.id && <input {...register('id')} type="hidden" value={form?.id} />}
        {!isEmpty(roles) && (
          <div>
            <Typography marginBottom="small" variant="h5">
              {t('form:user:input:roles:label')}
            </Typography>
            <For each={roles} keyed="id">
              {(item, index) => (
                <Checkbox
                  defaultChecked={form?.roles?.includes(item.id)}
                  value={item.id}
                  label={item.name}
                  error={
                    formState?.errors?.roles?.[index]?.message ? t(formState.errors.roles[index].message) : undefined
                  }
                  {...register(`roles[${index}]` as 'roles')}
                />
              )}
            </For>
            <Message className={error} error show={!!formState.errors.roles?.message}>
              <Icon name="AlertCircle" color="error" size="small" />
              {t(formState.errors?.roles?.message as string)}
            </Message>
          </div>
        )}
        <Switch expression={!!data?.ok}>
          <Match when={false}>
            <>
              <div className={buttonWrapper}>
                <Button size="normal" isLoading={formState.isSubmitting} type="submit">
                  {submitText}
                </Button>
                {!!onCancel && (
                  <Button size="normal" error outlined onClick={onCancel}>
                    {t('common:button:cancel')}
                  </Button>
                )}
              </div>
              <Message show={data?.ok === false && !formState.isSubmitting} error>
                {errorText}
              </Message>
            </>
          </Match>
          <Match when={true}>
            <Message success>{successText}</Message>
          </Match>
        </Switch>
      </Form>
    </div>
  );
};

export default UserForm;
