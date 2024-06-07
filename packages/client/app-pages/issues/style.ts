'use client';

import Link from 'next/link';
import styled, { css } from 'styled-components';

import { Card } from '@/components/mui';

export const Main = styled.main`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        max-width: 1440px;
        width: 100%;
        margin: 80px auto 0;
        gap: 20px;
        background: ${theme.color.mainBg};
        padding: ${theme.gap.m}px;
    `}
`;

export const CreateIssue = styled(Link)`
    ${({ theme }) => css`
        text-decoration: none;
        align-self: flex-end;
        color: ${theme.color.primary};
        padding: ${theme.gap.m}px;
        outline: 1px solid ${theme.color.primary};
        border-radius: 8px;
    `}
`;

export const IssuesBlock = styled.aside`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.l}px;
    `}
`;

export const IssueCard = styled(Card)`
    ${({ theme }) => css`
        cursor: pointer;
        padding: ${theme.gap.m}px;
    `}
`;
