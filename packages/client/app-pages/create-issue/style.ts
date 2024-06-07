'use client';

import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    flex-grow: 1;
    display: grid;
    place-items: center;
`;

export const Main = styled.form`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.l}px;
        flex-grow: 1;
        max-width: 1440px;
        width: 100%;
        margin: 80px auto 0;
        background: ${theme.color.mainBg};
        padding: ${theme.gap.m}px;
    `}
`;
