export type InvestmentType = {
    id: string;
    name: string;
    buy_amount: number;
    sell_amount: number;
    type: 'MUTUAL_FUND' | 'EQUITY' | 'OTHER';
    buy_date: string;
    sell_date: string | null;
    notes: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
};


export type InvestmentStatsTypes = {
    short_term: {
        buy: number;
        sell: number;
        short_term_net_income: number;
        tax: number;
    };
    long_term: {
        buy: number;
        sell: number;
        long_term_net_income: number;
        tax: number;
    };
    fyCount: number;
};

type TaxRate = `${number}%`;

interface IncomeRange {
    min_income: number;
    max_income: number | null;
}

export type TaxBracket = {
    tax_rate: TaxRate;
    single_filer: IncomeRange;
}