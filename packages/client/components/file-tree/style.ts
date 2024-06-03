import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    ${({ theme }) => css`
        color: ${theme.color.primary};
    `}
`;

export const FileItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`;
