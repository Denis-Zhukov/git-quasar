'use client';

import styled, { css } from 'styled-components';

export const LoginWrapper = styled.div`
    display: grid;
    place-items: center;
    flex-grow: 1;

    ${({ theme }) => css`
        form {
            display: flex;
            flex-direction: column;
            gap: ${theme.gap.l}px;
            padding: ${theme.gap.xxl}px;
            min-width: 400px;
            outline: 1px solid white;
        }
    `}
`;

export const RegisterBlock = styled.div`
    ${({ theme }) => css`
        color: ${theme.color.primary};

        a {
            color: ${theme.color.accent};
            text-decoration: none;
            font-weight: ${theme.weight.bold};
        }
    `}
`;
