export const tax_brackets = {
    long_term: [
        { limit: 47025, rate: 0.00 },
        { limit: 518900, rate: 0.15 },
        { limit: Infinity, rate: 0.20 },
    ],
    short_term: [
        { limit: 11600, rate: 0.10 },
        { limit: 47150, rate: 0.12 },
        { limit: 100525, rate: 0.22 },
        { limit: 191950, rate: 0.24 },
        { limit: 243725, rate: 0.32 },
        { limit: 609350, rate: 0.35 },
        { limit: Infinity, rate: 0.37 },
    ]
};
