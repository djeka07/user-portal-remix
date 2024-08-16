import { FetcherWithComponents, SubmitFunction, useActionData, useNavigation, useSubmit } from '@remix-run/react';
import { BaseSyntheticEvent, useCallback, useMemo, useState } from 'react';
import {
  Control,
  DefaultValues,
  FormState,
  KeepStateOptions,
  Path,
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetValue,
  useForm as rhUseForm,
} from 'react-hook-form';
import { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormProps } from 'react-hook-form';
import { SerializeFrom } from '@remix-run/node';
import { createFormData } from '@djeka07/utils';

export type SubmitFunctionOptions = Parameters<SubmitFunction>[1];

export interface UseFormParams<T extends FieldValues, TData = never> extends UseFormProps<T> {
  submitHandlers?: {
    onValid?: SubmitHandler<T>;
    onInvalid?: SubmitErrorHandler<T>;
  };
  submitConfig?: SubmitFunctionOptions;
  submitData?: FieldValues;
  fetcher?: FetcherWithComponents<TData>;
}

export type RegisterFunction<T extends FieldValues> = (
  name: Path<T>,
  options?:
    | (RegisterOptions<T> & {
        disableProgressiveEnhancement?: boolean | undefined;
      })
    | undefined,
) => UseFormRegisterReturn<Path<T>> & { defaultValue?: any };

interface UseFormStateReturn<T extends FieldValues, TData = unknown> {
  control: Control<T, any>;
  formState: FormState<T>;
  data?: SerializeFrom<TData> | undefined;
}

export interface UseFormActionReturn<T extends FieldValues> {
  register: UseFormRegister<T>;
  handleSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  reset: (values?: T | DefaultValues<T> | undefined, options?: KeepStateOptions) => void;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
}

type UseFormReturn<T extends FieldValues, TData> = [UseFormStateReturn<T, TData>, UseFormActionReturn<T>];

export const useForm = <T extends FieldValues, TData = unknown>({
  submitHandlers,
  submitConfig,
  submitData,
  fetcher,
  ...formProps
}: UseFormParams<T>): UseFormReturn<T, TData> => {
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const actionSubmit = useSubmit();
  const actionData = useActionData<TData>();
  const submit = fetcher?.submit ?? actionSubmit;
  const data = fetcher?.data ?? actionData;
  const methods = rhUseForm<T>({ ...formProps, errors: (data as any)?.errors || undefined });
  const navigation = useNavigation();

  const isSubmittingForm = useMemo(
    () =>
      (navigation.state !== 'idle' && navigation.formData !== undefined) ||
      (fetcher && fetcher.state !== 'idle' && fetcher.formData !== undefined),
    [navigation.state, navigation.formData, fetcher?.state, fetcher?.formData],
  );

  const formState: FormState<T> = useMemo(
    () => ({
      get isDirty() {
        return methods.formState.isDirty;
      },
      get isLoading() {
        return methods.formState.isLoading;
      },
      get isSubmitted() {
        return methods.formState.isSubmitted;
      },
      get isSubmitSuccessful() {
        return isSubmittedSuccessfully || methods.formState.isSubmitSuccessful;
      },
      get isSubmitting() {
        return isSubmittingForm || methods.formState.isSubmitting;
      },
      get isValidating() {
        return methods.formState.isValidating;
      },
      get isValid() {
        return methods.formState.isValid;
      },
      get disabled() {
        return methods.formState.disabled;
      },
      get submitCount() {
        return methods.formState.submitCount;
      },
      get defaultValues() {
        return methods.formState.defaultValues;
      },
      get dirtyFields() {
        return methods.formState.dirtyFields;
      },
      get touchedFields() {
        return methods.formState.touchedFields;
      },
      get validatingFields() {
        return methods.formState.validatingFields;
      },
      get errors() {
        return methods.formState.errors;
      },
    }),
    [methods.formState, isSubmittedSuccessfully, isSubmittingForm],
  );

  const reset = useCallback(
    (values?: T | DefaultValues<T> | undefined, options?: KeepStateOptions) => {
      setIsSubmittedSuccessfully(false);
      methods.reset(values, options);
    },
    [methods.reset],
  );

  const onSubmit = useCallback(
    (data: T) => {
      setIsSubmittedSuccessfully(true);
      const formData = createFormData({ ...data, ...submitData });
      submit(formData, {
        method: 'post',
        ...submitConfig,
      });
    },
    [submit, submitConfig, submitData],
  );

  const handleSubmit = useCallback(
    methods.handleSubmit(submitHandlers?.onValid ?? onSubmit, submitHandlers?.onInvalid ?? undefined),
    [methods.handleSubmit, submitHandlers, onSubmit],
  );

  const hookStateReturn = useMemo(
    () => ({
      control: methods.control,
      formState,
      data,
    }),
    [methods.control, methods.register, handleSubmit, reset, formState],
  );

  const hookActionReturn = useMemo(
    () => ({
      register: methods.register,
      handleSubmit,
      reset,
      getValues: methods.getValues,
      setValue: methods.setValue,
    }),
    [methods.register, handleSubmit, reset, methods.getValues, methods.setValue],
  );

  return [hookStateReturn, hookActionReturn];
};
