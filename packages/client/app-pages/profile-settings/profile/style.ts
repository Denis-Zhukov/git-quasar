'use client';

import styled, { css } from 'styled-components';

export const Form = styled.form`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        color: ${theme.color.primary};
        gap: ${theme.gap.l}px;
        width: 100%;
    `}
`;

export const DropzoneAndPreview = styled.div<{ isLoaded: boolean }>`
    ${({ theme, isLoaded }) => css`
        display: flex;
        color: ${theme.color.primary};
        gap: ${theme.gap.l}px;

        img {
            width: 400px;
            height: 400px;
            object-fit: contain;
            opacity: ${isLoaded ? 1 : 0};
            ${isLoaded && `border: 2px dashed ${theme.color.success}`}
        }
    `}
`;

export const Dropzone = styled.div`
    display: grid;
    place-items: center;
    border: 2px dashed white;
    width: 400px;
    height: 400px;
`;
