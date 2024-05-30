'use client';

import styled, { css } from 'styled-components';

export const RegisterWrapper = styled.div`
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

export const LoginBlock = styled.div`
    ${({ theme }) => css`
        color: ${theme.color.primary};

        a {
            color: ${theme.color.accent};
            text-decoration: none;
            font-weight: ${theme.weight.bold};
        }
    `}
`;

export const WordWrapBlock = styled.span`
    white-space: pre-wrap;
`;
