import { ChangeEvent, useMemo, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { difference, isEmpty } from '@djeka07/utils';
import { UsersResponse } from '~/users/models/services/generated/user.generated';
import { UserArrayFormData, UserFormData } from '../../users-access-form.schema';
import { message, selectAllCheckbox } from './users-form-part.css';
import { Checkbox, For, Icon, Message, Typography } from '@djeka07/ui';

type UsersFormPartProps = {
  users: UsersResponse;
  register: UseFormRegister<UserFormData>;
  setValue: UseFormSetValue<UserFormData>;
  errors?: FieldErrors<UserFormData>;
};

const UsersFormPart = ({ users, errors, register, setValue }: UsersFormPartProps) => {
  const { t } = useTranslation();
  const hasUsers = useMemo(() => users.total > 0, [users.total]);
  const hasMoreThanOneUser = useMemo(() => users.total > 1, [users.total]);
  const [selected, setSelected] = useState<string[]>([]);
  const allUsers = useMemo(() => {
    return users.users.map((a) => a.id).sort();
  }, [users.users]);

  const allSelected = useMemo(() => {
    return isEmpty(difference(allUsers, selected));
  }, [selected, allUsers]);

  const toggleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = !e.target.checked;
    if (checked) {
      setValue('userIds', [] as unknown as UserArrayFormData);
      setSelected([]);
      return checked;
    }
    setValue('userIds', allUsers as unknown as UserArrayFormData);
    setSelected(allUsers);
    return checked;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = !e.target.checked;
    setSelected((prev) => {
      if (checked) {
        return prev.filter((p) => p !== e.target.value);
      }
      prev = [...prev, e.target.value];
      return prev;
    });
  };
  return (
    <>
      <Typography marginBottom="small" variant="h3">
        {hasUsers ? 'Choose users' : 'No users'}
      </Typography>
      {hasMoreThanOneUser && (
        <Checkbox
          name="select-all"
          className={selectAllCheckbox}
          defaultChecked={allSelected}
          label={allSelected ? 'Unselect all' : 'Select all'}
          onChange={toggleCheckAll}
        />
      )}
      <ul>
        <For each={users.users} keyed={(user) => user.id}>
          {(user) => (
            <li>
              <Checkbox
                {...register('userIds')}
                defaultChecked={selected.includes(user.id)}
                value={user.id}
                label={`${user.firstName} ${user.lastName}`}
                onChange={onChange}
              />
            </li>
          )}
        </For>
      </ul>
      <Message margin={{ bottom: 4 }} className={message} show={!!errors?.userIds?.message} error>
        <Icon name="AlertCircle" color="error" />
        {t(errors?.userIds?.message as string)}
      </Message>
    </>
  );
};

export default UsersFormPart;
