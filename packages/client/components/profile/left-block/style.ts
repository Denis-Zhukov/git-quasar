'use client';

import styled, { css } from 'styled-components';

export const Block = styled.aside`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        flex-shrink: 0;
        color: ${theme.color.primary};
        gap: ${theme.gap.l}px;
    `}
`;

export const MainInfo = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${theme.gap.sm}px;

        h2 {
            text-transform: uppercase;
        }

        button {
            width: 100%;
        }
    `}
`;

export const NameSurname = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${theme.gap.xxs}px;
    `}
`;

export const FollowBlock = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: ${theme.gap.xs}px;
    `}
`;
