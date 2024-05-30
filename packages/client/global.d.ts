import 'styled-components';

import { Theme } from '@/constants/theme';

declare module 'styled-components' {
    // eslint-disable-next-line
    export interface DefaultTheme extends Theme {}
}
