import CloseIcon from '@mui/icons-material/Https';
import OpenIcon from '@mui/icons-material/LockOpen';
import { DateTimeFormat } from 'intl';

import { Block, Card, LinkCard } from '@/app-pages/profile-repositories/style';
import { URLS } from '@/constants/urls';

export const ProfileRepositoriesPage = async ({
    params: { name, locale },
}: {
    params: { name: string; locale: string };
}) => {
    const response = await fetch(URLS.getRepositoriesByName(name));
    const repositories = (await response.json()) as {
        id: string;
        name: string;
        private: boolean;
        createdAt: string;
    }[];

    const formatter = new DateTimeFormat(locale);

    const messages = await import(`@/messages/${locale}.json`);

    return (
        <Block>
            <h1>
                [{name}] {messages.repositories.title}
            </h1>
            {repositories.map(
                ({ id, name: repoName, private: privateRepo, createdAt }) => (
                    <LinkCard
                        href={`/${locale}/repository/${name}/${repoName}`}
                        key={id}
                    >
                        <Card>
                            <div>
                                <h3>{repoName}</h3>
                                {privateRepo ? <CloseIcon /> : <OpenIcon />}
                            </div>
                            <p>{formatter.format(new Date(createdAt))}</p>
                        </Card>
                    </LinkCard>
                ),
            )}
        </Block>
    );
};
