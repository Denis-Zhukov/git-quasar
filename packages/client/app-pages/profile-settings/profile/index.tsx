'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

import {
    ProfileForm,
    ProfileProps,
} from '@/app-pages/profile-settings/profile/types';
import { Button, TextField } from '@/components/mui';
import { useSuccess } from '@/hooks/toasts';
import { useActions } from '@/hooks/useActionts';
import { useUpdateProfileMutation } from '@/store/quries/profile';

import { Dropzone, DropzoneAndPreview, Form } from './style';

export const Profile = ({ username }: ProfileProps) => {
    const t = useTranslations('profile-settings.profile-tab');
    const { register, setValue, watch, handleSubmit } = useForm<ProfileForm>({
        defaultValues: {
            avatar: null,
            username,
            currentUsername: username,
        },
    });

    const avatar = watch('avatar');

    const previewRef = useRef<HTMLImageElement | null>(null);

    const onDrop = useCallback((files: File[]) => {
        if (!previewRef.current || !files[0]) return;

        const image = files[0];
        setValue('avatar', image);
        previewRef.current.src = URL.createObjectURL(image);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        minSize: 0,
        maxSize: 1e7,
    });

    const [update, { isSuccess, isLoading }] = useUpdateProfileMutation();

    useSuccess(t('success'), isSuccess);

    const { setUsername } = useActions();

    const onSubmit = handleSubmit(async (data) => {
        await update(data);
        setValue('currentUsername', data.username);
        setUsername(data.username);
    });

    return (
        <Form onSubmit={onSubmit}>
            <DropzoneAndPreview isLoaded={!!avatar}>
                <Dropzone {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here...</p>
                    ) : (
                        <Button>Загрузить аватарку</Button>
                    )}
                </Dropzone>
                <img ref={previewRef} alt="preview avatar" />
            </DropzoneAndPreview>

            <TextField {...register('username')} label={t('username')} />
            <TextField {...register('name')} label={t('name')} />
            <TextField {...register('surname')} label={t('surname')} />
            <TextField
                {...register('bio')}
                label={t('bio')}
                minRows={10}
                maxRows={10}
                multiline
            />
            <Button type="submit" disabled={isLoading}>
                {t('update')}
            </Button>
        </Form>
    );
};
