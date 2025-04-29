export const getQuery = (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });

    return searchParams.toString();
}

export const getInvestmentHoldingType = (buyDate: string | Date, sellDate?: string | Date | null): 'SHORT_TERM' | 'LONG_TERM' | '-' => {
    const buy = new Date(buyDate);
    const sell = sellDate ? new Date(sellDate) : new Date();

    if (isNaN(buy.getTime())) return '-';

    const diffTime = Math.abs(sell.getTime() - buy.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays < 365 ? 'SHORT_TERM' : 'LONG_TERM';
};

export const formatMoney = (
    value: number | string | null | undefined,
    currency: string = 'USD'
): string => {
    if (value === null || value === undefined || value === '') return '-';

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) return '-';

    return numericValue.toLocaleString('en-US', {
        style: 'currency',
        currency,
    });
};