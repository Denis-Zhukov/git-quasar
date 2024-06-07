'use client';

import styled, { css } from 'styled-components';

export const Observer = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: ${theme.gap.l}px;
    `}
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Content = styled.code`
    ${({ theme }) => css`
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        white-space: pre-wrap;
        overflow-y: scroll;
        color: ${theme.color.primary};
        padding: 10px ${theme.gap.l}px;
        outline: 1px solid rgba(89, 103, 117, 0.88);
        border-radius: 8px;
        height: 550px;

        div:nth-child(1) {
            flex-shrink: 0;
            text-align: right;
        }

        div:nth-child(2) {
            flex-shrink: 0;
        }
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
