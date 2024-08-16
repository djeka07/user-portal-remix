import { ChangeEvent, useMemo, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GetApplicationsResponse } from '~/users/models/services/generated/user.generated';
import { UserArrayFormData, UserFormData } from '../../users-access-form.schema';
import { selectAllCheckbox } from '../users-form-part/users-form-part.css';
import { message } from './applications-form-part.css';
import { difference, isEmpty } from '@djeka07/utils';
import { Checkbox, For, Icon, Message, Typography } from '@djeka07/ui';

type ApplicationFormPartProps = {
  applications: GetApplicationsResponse['applications'];
  selectedApplications?: string[];
  errors?: FieldErrors<UserFormData>;
  register: UseFormRegister<UserFormData>;
  setValue: UseFormSetValue<UserFormData>;
};

const ApplicationFormPart = ({ applications, register, errors, setValue }: ApplicationFormPartProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const allApplications = useMemo(() => {
    return applications.map((a) => a.appId).sort();
  }, [applications]);

  const allSelected = useMemo(() => {
    return isEmpty(difference(allApplications, selected));
  }, [selected, allApplications]);

  const toggleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = !e.target.checked;
    if (checked) {
      setValue('applicationIds', [] as unknown as UserArrayFormData);
      setSelected([]);
      return checked;
    }
    setValue('applicationIds', allApplications as unknown as UserArrayFormData);
    setSelected(allApplications);
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
        Choose applications
      </Typography>
      <Checkbox
        name="select-all"
        className={selectAllCheckbox}
        defaultChecked={allSelected}
        label={allSelected ? 'Unselect all' : 'Select all'}
        onChange={toggleCheckAll}
      />
      <ul>
        <For each={applications} keyed={(a) => a.appId}>
          {(item) => (
            <li>
              <Checkbox
                {...register('applicationIds')}
                name="applicationIds"
                defaultChecked={selected.includes(item.appId)}
                label={item.appName}
                value={item.appId}
                onChange={onChange}
              />
            </li>
          )}
        </For>
      </ul>
      <Message margin={{ bottom: 8 }} className={message} error show={!!errors?.applicationIds?.message}>
        <Icon name="AlertCircle" color="error" />
        {t(errors?.applicationIds?.message as string)}
      </Message>
    </>
  );
};
export default ApplicationFormPart;
