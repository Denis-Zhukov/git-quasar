'use client';

import styled, { css } from 'styled-components';

export const Main = styled.main`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.m}px;
        width: 100%;
        max-width: 1440px;
        margin: 80px auto 0;
        color: ${theme.color.primary};
        background: ${theme.color.mainBg};
        padding: ${theme.gap.m}px;
        flex-grow: 1;
        align-items: center;

        h1,
        p {
            max-width: 600px;
            width: 100%;
        }

        button {
            max-width: 400px;
            width: 100%;
        }
    `}
`;
