export type SendMoneyFormType = {
    id?: string;
    sourceAccount: string;
    destinationAccount: string;
    amount: number;
    description: string;
};

export type TransactionEntry = {
    id: string;
    account: {
        accountNumber: string;
    };
    amount: string;
    type: 'DEBIT' | 'CREDIT';
};

export type TransactionResponse = {
    id: string;
    transactionDate: string;
    description: string;
    entries: TransactionEntry[];
};
