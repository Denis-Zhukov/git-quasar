'use client';

import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Main = styled.main`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.l}px;
        width: 100%;
        max-width: 1440px;
        margin: 80px auto 0;
        color: ${theme.color.primary};
        background: ${theme.color.mainBg};
        flex-grow: 1;
        padding: ${theme.gap.m}px;

        > div {
            display: flex;
            flex-direction: column;
            gap: ${theme.gap.l}px;
        }

        a {
            color: ${theme.color.primary};
            font-size: 18px;
            outline: 1px solid ${theme.color.primary};
            align-self: flex-end;
            text-decoration: none;
            border-radius: 8px;
            padding: 6px 8px;
        }
    `}
`;

export const Card = styled(Link)`
    ${({ theme }) => css`
        width: 100%;
        display: flex;
        text-decoration: none;
        color: ${theme.color.primary};
        font-size: 18px;
        outline: 1px solid ${theme.color.primary};
        align-self: flex-end;
        border-radius: 8px;
        padding: 16px 20px !important;
        gap: 20px;

        div:nth-child(1) {
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 200px;
            width: 100%;
        }

        div:nth-last-child(1) {
            flex-grow: 1;
            text-align: right;
        }
    `}
`;
