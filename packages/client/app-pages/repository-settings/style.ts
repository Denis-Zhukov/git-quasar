'use client';

import styled, { css } from 'styled-components';

import { TabPanel } from '@/components/mui';

export const Main = styled.main`
    ${({ theme }) => css`
        display: flex;
        gap: ${theme.gap.l}px;
        width: 100%;
        max-width: 1440px;
        margin: 80px auto 0;
        flex-shrink: 1;
    `}
`;

export const FullWidthTab = styled(TabPanel)`
    width: 100%;
`;
