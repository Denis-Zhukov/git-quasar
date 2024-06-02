'use client';

import styled from 'styled-components';

import { Menu } from '@/components/mui';

export const Block = styled.main`
    width: 1440px;
    margin: 80px auto 0;
`;

export const GetRepository = styled(Menu)`
    > * > * {
        display: flex;
        flex-direction: column;
    }
`;

export const Explorer = styled.div`
    display: flex;
    height: 600px;

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
