import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    place-items: center;
    flex-grow: 1;

    main {
        text-align: center;
        color: ${({ theme }) => theme.color.primary};
    }
`;
