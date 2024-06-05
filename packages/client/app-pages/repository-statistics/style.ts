'use client';

import styled, { css } from 'styled-components';

export const Main = styled.main`
    ${({ theme }) => css`
        color: ${theme.color.primary};
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${theme.gap.l}px;
        width: 100%;
        max-width: 1440px;
        margin: 80px auto 0;
    `}
`;
