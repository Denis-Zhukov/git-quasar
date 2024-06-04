import { useTranslations } from 'next-intl';
import { object, string } from 'yup';

export const generateCollaboratorSchema = (
    t: ReturnType<
        typeof useTranslations<'repository-settings.collaborator-required'>
    >,
) =>
    object({
        collaborator: string().required(t('collaborator-required')),
    });
