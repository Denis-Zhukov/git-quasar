'use client';

import { useTranslations } from 'next-intl';

import { Breadcrumbs, ToggleButton } from '@/components/mui';
import { theme } from '@/constants/theme';
import { parseCode } from '@/utils/parse-blame-code';

import { Content, Header, Observer } from './style';
import type { FileObserverProps } from './types';

export const FileObserver = ({
    content,
    path,
    blame,
    onClickBlame,
}: FileObserverProps) => {
    const t = useTranslations('repository');
    const crumbs = path.replace(/^.\//, '').split('/');

    const { authors, code } = parseCode(content, blame);

    return (
        <Observer>
            <Header>
                <Breadcrumbs>
                    {crumbs?.map((crumb, i) => (
                        <span
                            key={`${crumb}-${i}`}
                            style={{
                                color:
                                    i === crumbs.length - 1
                                        ? theme.color.primary
                                        : 'inherit',
                            }}
                        >
                            {' '}
                            {crumb}{' '}
                        </span>
                    ))}
                </Breadcrumbs>
                <ToggleButton
                    value="blame"
                    selected={blame}
                    onChange={onClickBlame(path)}
                    size="small"
                >
                    {t('blame')}
                </ToggleButton>
            </Header>

            <Content>
                <div>{authors}</div>
                <div>
                    {code || 'Тут будет отображен текст выбранного файла'}
                </div>
            </Content>
        </Observer>
    );
};
