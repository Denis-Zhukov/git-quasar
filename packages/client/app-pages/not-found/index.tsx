import Image from 'next/image';
import Link from 'next/link';

import { Content, Main } from '@/app-pages/not-found/style';

export const NotFoundPage = () => {
    return (
        <Main>
            <Content>
                <Image
                    src="/images/404.png"
                    width={500}
                    height={500}
                    alt="404"
                />
                <Link href="/">GitQuasar</Link>
            </Content>
        </Main>
    );
};
