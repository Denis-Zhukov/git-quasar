export const theme = {
    color: {
        accent: '#5a5ade',
        darkAccent: '#4a4a65',
        primary: '#FFFFFF',
        second: '#a6a6a6',
        success: '#2db73e',
        mainBg: 'rgba(15, 18, 20, 0.88)',
    },
    gap: {
        xxs: 4,
        xs: 8,
        sm: 14,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
    },
    fontSize: {
        xs: 12,
        sm: 14,
        m: 16,
        l: 20,
        xl: 24,
        xxl: 28,
        xxxl: 32,
        xxxxl: 48,
    },
    weight: {
        normal: 400,
        bold: 700,
    },
};

export type Theme = typeof theme;
