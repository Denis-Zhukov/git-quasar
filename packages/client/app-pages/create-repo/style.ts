'use client';

import styled, { css } from 'styled-components';

export const Main = styled.main`
    ${({ theme }) => css`
        display: grid;
        place-items: center;
        flex-grow: 1;

        form {
            display: flex;
            flex-direction: column;
            gap: ${theme.gap.m}px;
            margin: 0 auto;
            width: 600px;

            h1 {
                font-size: ${theme.fontSize.xl}px;
                color: ${theme.color.primary};
            }

            label {
                color: ${theme.color.primary};
            }

            button {
                align-self: flex-end;
            }
        }
    `}
`;
