'use client';

import styled, { css } from 'styled-components';

import { Card } from '@/components/mui';

export const Main = styled.main`
    ${({ theme }) => css`
        display: flex;
        width: 100%;
        max-width: 1440px;
        margin: 80px auto 0;
        flex-grow: 1;
        gap: ${theme.gap.xxl}px;

        @media screen and (max-width: 799px) {
            flex-direction: column;
            padding: 0 ${theme.gap.m}px;
        }
    `}
`;

export const Favorites = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-wrap: wrap;
        gap: ${theme.gap.m}px;
    `}
`;

export const RepositoryCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
`;
