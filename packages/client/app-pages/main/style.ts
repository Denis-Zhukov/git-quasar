'use client';

import styled, { css } from 'styled-components';

export const Main = styled.main`
    ${({ theme }) => css`
        flex-grow: 1;
        width: 1440px;
        margin: 80px auto 0;
        color: ${theme.color.primary};
        background: ${theme.color.mainBg};
        padding: 0 ${theme.gap.m}px;
    `}
`;

export const TopBlock = styled.aside`
    ${({ theme }) => css`
        h1 {
            font-size: ${theme.fontSize.xxxxl}px;
        }

        h1 + p {
            max-width: 400px;
            font-size: ${theme.fontSize.sm}px;
            color: ${theme.color.second};
        }

        img {
            width: 100%;
            filter: brightness(1.75) blur(1px) contrast(125%);
        }
    `}
`;

export const CenterBlock = styled.aside`
    ${({ theme }) => css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${theme.gap.xxl}px 0;

        h2 {
            grid-column: 1/3;
            font-size: ${theme.fontSize.xxxl}px;
            text-align: center;
            margin-top: 80px;
            margin-bottom: 40px;
        }

        p {
            justify-self: end;
            align-self: center;
            font-size: ${theme.fontSize.l}px;
            text-align: right;
            max-width: 450px;

            &:nth-child(4) {
                text-align: left;
                justify-self: start;
            }
        }

        img {
            width: 100%;
            object-fit: contain;
        }
    `}
`;

export const BottomBlock = styled.aside`
    ${({ theme }) => css`
        h2 {
            font-size: ${theme.fontSize.xxxl}px;
        }

        p {
            margin-bottom: 20px;
        }
    `}
`;
