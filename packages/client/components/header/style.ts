import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Header = styled.header`
    ${({ theme }) => css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${theme.gap.m}px ${theme.gap.l}px;
        height: 80px;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
    `}
`;

export const Nav = styled.nav`
    ${({ theme }) => css`
        display: flex;
        gap: ${theme.gap.m}px;
        align-items: center;

        a {
            font-size: ${theme.fontSize.l}px;
            color: ${theme.color.primary};
            text-decoration: none;
        }

        a:has(img) {
            margin-right: ${theme.gap.xl}px;
        }
    `}
`;

export const RightBlock = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        gap: ${theme.gap.m}px;
    `}
`;

export const CreateRepo = styled(Link)`
    ${({ theme }) => css`
        color: ${theme.color.primary};
        text-decoration: none;
        font-weight: ${theme.weight.bold};
        font-size: ${theme.fontSize.xxl}px;
    `}
`;

export const Buttons = styled.div`
    ${({ theme }) => css`
        display: flex;
        gap: ${theme.gap.m}px;

        a {
            font-size: ${theme.fontSize.m}px;
            color: ${theme.color.primary};
            text-decoration: none;
            padding: ${theme.gap.xxs}px ${theme.gap.xs}px;
            border-radius: 4px;

            &:nth-child(2) {
                border: 1px solid ${theme.color.primary};
            }
        }
    `}
`;

export const Avatar = styled(Image)`
    ${({ theme }) => css`
        cursor: pointer;
        border-radius: 50%;
    `}
`;
