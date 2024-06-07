'use client';

import { Main } from '@/app-pages/pull-request/style';
import { Button } from '@/components/mui';
import { useSuccess } from '@/hooks/toasts';
import {
    useGetPullRequestQuery,
    useMergeMutation,
} from '@/store/quries/pull-requests';

export const PullRequestPage = ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const { data } = useGetPullRequestQuery({ id });

    const [merge, { data: res, isSuccess }] = useMergeMutation();
    useSuccess('Ветка обьеденены', isSuccess);

    if (!data) return null;

    return (
        <Main>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            <p>
                Ветка &#39;{data.source}&#39; будет залита в &#39;
                {data.destination}&#39;
            </p>
            <Button onClick={() => merge({ id })}>Объеденить</Button>
        </Main>
    );
};
