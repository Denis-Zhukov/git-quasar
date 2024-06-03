'use client';

import styled, { css } from 'styled-components';

import { Menu } from '@/components/mui';

export const Block = styled.main`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        gap: ${theme.gap.l}px;
        width: 100%;
        max-width: 1440px;
        margin: 80px auto 0;
    `}
`;

export const HeaderRepository = styled.nav`
    ${({ theme }) => css`
        display: flex;
        justify-content: space-between;
    `}
`;
export const GetRepository = styled(Menu)`
    > * > * {
        ${({ theme }) => css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: ${theme.gap.xs}px;

            a {
                color: ${theme.color.primary};
                text-decoration: none;
            }
        `}
    }
`;

export const Explorer = styled.div`
    display: flex;
    height: 600px;

    ul {
        list-style: none;
    }

    > *:nth-child(1) {
        flex-basis: 250px;
        flex-shrink: 0;
        height: 100%;
    }

    > *:nth-child(2) {
        flex-grow: 1;
        height: 100%;
    }
`;
