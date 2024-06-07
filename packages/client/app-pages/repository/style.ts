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
        background: ${theme.color.mainBg};
        padding: ${theme.gap.m}px;
        flex-grow: 1;
    `}
`;

export const RepositoryNav = styled.nav`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        border-bottom: 1px solid ${theme.color.primary};
        padding: ${theme.gap.m}px;
        gap: ${theme.gap.l}px;

        a {
            text-decoration: none;
            color: ${theme.color.primary};
        }

        button {
            min-width: 0;
            margin-left: auto;
        }
    `}
`;

export const HeaderRepository = styled.div`
    ${({ theme }) => css`
        display: flex;

        button:nth-child(2) {
            margin-left: auto;
        }
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
    ${({ theme }) => css`
        display: grid;
        grid-template-columns: 250px 1fr;
        height: 600px;
        gap: 20px;

        h3 {
            color: ${theme.color.primary};
        }

        ul {
            list-style: none;
        }
    `}
`;
