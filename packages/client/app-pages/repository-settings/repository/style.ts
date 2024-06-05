'use client';

import styled, { css } from 'styled-components';

export const Tab = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        color: ${theme.color.primary};
        gap: ${theme.gap.xxl}px;
        width: 100%;

        button {
            align-self: flex-start;
            max-width: 200px;
            width: 100%;
        }
    `}
`;
