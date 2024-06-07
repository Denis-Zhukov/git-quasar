import styled, { css } from 'styled-components';

export const Main = styled.main`
    ${({ theme }) => css`
        display: flex;
        flex-grow: 1;
        width: 100%;
        max-width: 1440px;
        margin: 80px auto 0;
        padding: ${theme.gap.m}px;
        background: ${theme.color.mainBg};
    `}
`;
