import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    place-items: center;
    flex-grow: 1;

    background: url('/images/stars-space.jpg') no-repeat center;
    animation: moveBackground 30s linear infinite;

    main {
        ${({ theme }) => css`
            padding: ${theme.gap.xxl}px;
            text-align: center;

            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1),
                rgba(255, 255, 255, 0)
            );
            backdrop-filter: blur(8px);
            border-radius: 20px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

            h1 {
                color: ${theme.color.primary};
                margin-bottom: ${theme.gap.xl}px;
            }

            p {
                color: ${theme.color.primary};
                white-space: pre-wrap;

                &:nth-child(2) {
                    margin-bottom: ${theme.gap.l}px;
                }

                &:nth-child(3) {
                    font-size: ${theme.fontSize.sm}px;
                }
            }
        `}
    }

    @keyframes moveBackground {
        0% {
            background-size: 100% 100%;
        }
        50% {
            background-size: 120% 120%;
        }
        100% {
            background-size: 100% 100%;
        }
    }
`;
