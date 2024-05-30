import { useTranslations } from 'next-intl';
import { boolean, object, string } from 'yup';

const repoNameRegex = /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*$/;

export const generateCreateRepoSchema = (
    t: ReturnType<typeof useTranslations<'register-form'>>,
) =>
    object({
        repoName: string()
            .required(t('name.required'))
            .matches(repoNameRegex, t('name.wrong')),
        privateRepo: boolean().required(),
    });
