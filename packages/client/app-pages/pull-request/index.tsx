'use client';

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

    const [merge, { data: res }] = useMergeMutation();

    return (
        <div>
            <button
                onClick={() => merge({ id })}
                style={{ marginTop: '100px' }}
            >
                Merge
            </button>
        </div>
    );
};
