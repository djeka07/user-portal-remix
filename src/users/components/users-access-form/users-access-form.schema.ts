import zod from 'zod';

export const usersFormSchema = zod.object({
  access: zod.boolean(),
  userIds: zod.string().array().nonempty('form:user:input:users:error'),
  applicationIds: zod.string().array().nonempty('form:user:input:apps:error'),
});

export type UserFormData = zod.infer<typeof usersFormSchema>;
export type UserArrayFormData = [string, ...string[]];
