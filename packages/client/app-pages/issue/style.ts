'use client';

import styled, { css } from 'styled-components';

import { Card } from '@/components/mui';

export const Main = styled.main`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.l}px;
        flex-grow: 1;
        max-width: 1440px;
        width: 100%;
        margin: 80px auto 0;
        color: ${theme.color.primary};
    `}
`;

export const CommentWrapper = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.xl}px;
        flex-grow: 1;
    `}
`;

export const Comment = styled(Card)`
    ${({ theme }) => css`
        display: flex;
        flex-wrap: wrap;
        padding: ${theme.gap.m}px;

        > p {
            width: 100%;
            word-break: break-all;
            margin-bottom: ${theme.gap.m}px;
        }
    `}
`;

export const SendForm = styled.form`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.xs}px;
        margin-bottom: ${theme.gap.xl}px;

        button {
            display: flex;
            align-items: center;
            align-self: flex-end;

            svg {
                margin-left: ${theme.gap.xs}px;
            }
        }
    `}
`;
