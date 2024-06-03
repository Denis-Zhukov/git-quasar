'use client';

import SendIcon from '@mui/icons-material/Send';
import Dislike from '@mui/icons-material/ThumbDownOffAlt';
import Like from '@mui/icons-material/ThumbUpOffAlt';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button, TextField } from '@/components/mui';
import { useAppSelector } from '@/hooks/redux-toolkit';
import { useGetIssueQuery, useMessageMutation } from '@/store/quries/issues';
import { selectAuth } from '@/store/slices/auth/selectors';

import { Comment, CommentWrapper, Main, SendForm } from './style';
import { IssueForm } from './types';

export const Issue = ({ params: { id } }: { params: { id: string } }) => {
    const t = useTranslations('issue');
    const { data } = useGetIssueQuery({ issue: id });
    const locale = useLocale();
    const formatter = new Intl.DateTimeFormat(locale);
    const { authorized } = useAppSelector(selectAuth);

    const { register, handleSubmit, setValue } = useForm<IssueForm>();

    const [sendMessage] = useMessageMutation();

    const onSubmit = handleSubmit(({ comment }) => {
        if (!comment) return;
        sendMessage({ message: comment, issueId: id });
        setValue('comment', '');
    });

    if (!data) return null;

    const { title, IssueMessage: messages, createdAt } = data;

    return (
        <Main>
            <h1>{title}</h1>
            <h3>{formatter.format(new Date(createdAt))}</h3>

            <CommentWrapper>
                {messages.map(({ id, text, likes, dislikes }) => (
                    <Comment key={id}>
                        <p>{text}</p>
                        <Button startIcon={<Like />}>{likes}</Button>
                        <Button startIcon={<Dislike />}>{dislikes}</Button>
                    </Comment>
                ))}
            </CommentWrapper>

            {authorized && (
                <SendForm onSubmit={onSubmit}>
                    <TextField
                        {...register('comment')}
                        label="Message"
                        fullWidth
                    />
                    <Button type="submit">
                        {t('send')} <SendIcon fontSize="small" />
                    </Button>
                </SendForm>
            )}
        </Main>
    );
};
