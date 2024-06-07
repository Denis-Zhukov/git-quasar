import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    ${({ theme }) => css`
        color: ${theme.color.primary};

        h3 {
            margin-bottom: 8px;
        }

        ul {
            padding: 20px;
            outline: 1px solid rgba(89, 103, 117, 0.88);
            height: 100%;
            border-radius: 8px;
        }
    `}
`;

export const FileItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`;
