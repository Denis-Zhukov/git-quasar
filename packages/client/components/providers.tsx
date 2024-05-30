'use client';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider as ThemeProviderSC } from 'styled-components';

import { theme as muiTheme } from '@/app/[locale]/theme';
import StoreProvider from '@/components/store-provider';
import { theme } from '@/constants/theme';
import StyledComponentsRegistry from '@/utils/registry';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={muiTheme}>
            <StyledComponentsRegistry>
                <AppRouterCacheProvider>
                    <StoreProvider>
                        <ThemeProviderSC theme={theme}>
                            {children}
                        </ThemeProviderSC>
                    </StoreProvider>
                </AppRouterCacheProvider>
            </StyledComponentsRegistry>
        </ThemeProvider>
    );
};
