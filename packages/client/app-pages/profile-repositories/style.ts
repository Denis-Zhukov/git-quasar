'use client';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { Card as CardMui } from '@/components/mui';

export const Block = styled.main`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 1440px;
        margin: 80px auto 0;
        gap: ${theme.gap.m}px;
        color: ${theme.color.primary};
        background: ${theme.color.mainBg};
        padding: ${theme.gap.m}px;
        flex-grow: 1;
    `}
`;

export const LinkCard = styled(Link)`
    ${({ theme }) => css`
        color: ${theme.color.primary};
        text-decoration: none;
    `}
`;

export const Card = styled(CardMui)`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.m}px;
        padding: ${theme.gap.m}px;
        background: ${theme.color.darkAccent} !important;

        div {
            display: flex;
            gap: ${theme.gap.xxs}px;
        }
    `}
`;
