import { useTranslations } from 'next-intl';
import { object, string } from 'yup';

const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{1,31}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const generateRegisterSchema = (
    t: ReturnType<typeof useTranslations<'register-form'>>,
) =>
    object({
        username: string()
            .required(t('username.required'))
            .matches(usernameRegex, t('username.regex')),
        email: string()
            .required(t('email.required'))
            .email(t('email.incorrect')),
        password: string()
            .required(t('password.required'))
            .matches(passwordRegex, t('password.regex')),
        confirmPassword: string()
            .required(t('confirm-password.required'))
            .test(
                'same password',
                t('confirm-password.different'),
                function (value) {
                    return value === this.parent.password;
                },
            ),
    });
