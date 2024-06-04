'use client';

import styled, { css } from 'styled-components';

export const Block = styled.aside`
    ${({ theme }) => css`
        width: 100%;
        flex-grow: 3;
        color: ${theme.color.primary};

        h2 {
            margin-bottom: ${theme.gap.sm}px;
        }

        h2 + * {
            margin-bottom: ${theme.gap.xxl}px;
        }
    `}
`;
