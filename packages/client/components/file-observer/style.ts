'use client';

import styled, { css } from 'styled-components';

export const Content = styled.code`
    ${({ theme }) => css`
        display: block;
        white-space: pre-wrap;
        overflow-y: scroll;
        color: ${theme.color.primary};
        padding: 0 ${theme.gap.l}px;
    `}

    &::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #6a11cb, #2575fc);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #6a11cb, #1e90ff);
    }
`;
