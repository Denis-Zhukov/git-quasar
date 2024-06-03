'use client';

import styled, { css } from 'styled-components';

export const Main = styled.form`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.l}px;
        flex-grow: 1;
        max-width: 1440px;
        width: 100%;
        margin: 80px auto 0;
    `}
`;
