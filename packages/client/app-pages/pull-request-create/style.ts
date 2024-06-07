'use client';

import styled, { css } from 'styled-components';

export const Main = styled.form`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.l}px;
        width: 100%;
        max-width: 1440px;
        margin: 80px auto 0;
        color: ${theme.color.primary};
        background: ${theme.color.mainBg};
        padding: ${theme.gap.m}px;
        flex-grow: 1;
    `}
`;

export const Branches = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    > *:nth-child(2),
    > *:nth-child(4) {
        max-width: 200px;
        width: 100%;
    }
`;
