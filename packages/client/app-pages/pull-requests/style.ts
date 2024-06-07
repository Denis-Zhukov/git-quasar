'use client';

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
