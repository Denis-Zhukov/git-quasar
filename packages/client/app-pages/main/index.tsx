'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import {
    BottomBlock,
    CenterBlock,
    Main,
    TopBlock,
} from '@/app-pages/main/style';

export const MainPage = () => {
    const t = useTranslations('main');

    return (
        <Main>
            <TopBlock>
                <h1>{t('title')}</h1>
                <p>{t('hosting')}</p>
                <Image
                    src="/images/aliean-planet.png"
                    alt="Alien"
                    width={1000}
                    height={720}
                />
            </TopBlock>

            <CenterBlock>
                <h2>{t('features')}</h2>
                <Image
                    src="/images/mars.png"
                    alt="Mars"
                    width={300}
                    height={300}
                />
                <p>{t('unlimited')}</p>
                <p>{t('tools')}</p>
                <Image
                    src="/images/astoman.png"
                    alt="Astromen"
                    width={300}
                    height={300}
                />
            </CenterBlock>

            <BottomBlock>
                <p>{t('start')}</p>
                <p>{t('free')}</p>
            </BottomBlock>
        </Main>
    );
};
