'use client';

import styled, { css } from 'styled-components';

export const Tab = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        color: ${theme.color.primary};
        gap: ${theme.gap.xxl}px;
        max-width: 500px;
        width: 100%;
    `}
`;

export const AddCollaboratorForm = styled.form`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.sm}px;

        > *:nth-child(1) {
            width: 100%;
        }

        button {
            align-self: flex-end;
        }
    `}
`;

export const UserCard = styled.div`
    ${({ theme }) => css`
        display: flex;
        gap: ${theme.gap.l}px;
        align-items: center;
        color: ${theme.color.primary};

        > *:nth-child(1) {
            max-width: 500px;
            width: 100%;
        }

        button {
            min-width: 0;
        }
    `}
`;
