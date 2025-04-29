import { tax_brackets } from "src/constants/tax";

export function calculateIncomeTax(income: number, status = 'short_term') {

    if (income <= 0) return 0;

    const statusKey = status === 'short_term' ? 'short_term' : 'long_term';
    const ranges = tax_brackets[statusKey];

    let tax = 0;
    let lastLimit = 0;

    for (const bracket of ranges) {
        if (income > bracket.limit) {
            tax += (bracket.limit - lastLimit) * bracket.rate;
            lastLimit = bracket.limit;
        } else {
            tax += (income - lastLimit) * bracket.rate;
            break;
        }
    }

    return tax;
}
