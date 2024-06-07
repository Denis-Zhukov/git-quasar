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
    `}
`;
