import { yupResolver } from '@hookform/resolvers/yup';
import CrossIcon from '@mui/icons-material/Close';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import {
    AddCollaboratorForm,
    Tab,
    UserCard,
} from '@/app-pages/repository-settings/collaborators/style';
import { generateCollaboratorSchema } from '@/app-pages/repository-settings/collaborators/validation';
import { Button, TextField } from '@/components/mui';
import { useError, useSuccess } from '@/hooks/toasts';
import {
    useAddCollaboratorMutation,
    useGetCollaboratorsQuery,
    useRemoveCollaboratorMutation,
} from '@/store/quries/repositories';
import { isError } from '@/utils/is-error';

import { CollaboratorsForm, CollaboratorsProps } from './types';

export const Collaborators = ({ username, repository }: CollaboratorsProps) => {
    const t = useTranslations('repository-settings.collaborators-tab');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CollaboratorsForm>({
        resolver: yupResolver(generateCollaboratorSchema(t)),
    });

    const [addCollaborator, { isSuccess: added, error }] =
        useAddCollaboratorMutation();
    const onSubmit = handleSubmit(({ collaborator }) => {
        addCollaborator({ collaborator, username, repository });
    });
    useSuccess('Участник добавлен', added);

    const { data: collaborators } = useGetCollaboratorsQuery({
        username,
        repository,
    });

    const [removeCollaborator, { isSuccess: removed }] =
        useRemoveCollaboratorMutation();
    const handleRemoveCollaborator = (collaboratorId: string) => () => {
        removeCollaborator({ collaboratorId, username, repository });
    };

    useSuccess('Участник удален', removed);
    useError(isError(error) && t(error?.message), error);

    return (
        <Tab>
            <AddCollaboratorForm onSubmit={onSubmit}>
                <TextField
                    {...register('collaborator')}
                    label={t('username')}
                    helperText={errors.collaborator?.message}
                    error={!!errors.collaborator}
                />
                <Button type="submit">{t('add-collaborator')}</Button>
            </AddCollaboratorForm>

            {!!collaborators?.length && (
                <div>
                    <h2>{t('user')}</h2>
                    {collaborators?.map(({ id, username, email }) => (
                        <UserCard key={id}>
                            <div>
                                {username} ({email})
                            </div>
                            <Button
                                onClick={handleRemoveCollaborator(id)}
                                color="error"
                            >
                                <CrossIcon />
                            </Button>
                        </UserCard>
                    ))}
                </div>
            )}
        </Tab>
    );
};
