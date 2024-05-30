import { object, string } from 'yup';

export const loginSchema = object({
    usernameOrEmail: string().required(),
    password: string().required(),
});
