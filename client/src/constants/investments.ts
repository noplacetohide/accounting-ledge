import { TaxBracket } from "@/types/investment"


export const SHORT_TERM_TAX_SLAB: TaxBracket[] = [
    {
        "tax_rate": "10%",
        "single_filer": {
            "min_income": 0,
            "max_income": 11600
        }
    },
    {
        "tax_rate": "12%",
        "single_filer": {
            "min_income": 11601,
            "max_income": 47150
        }
    },
    {
        "tax_rate": "22%",
        "single_filer": {
            "min_income": 47151,
            "max_income": 100525
        }
    },
    {
        "tax_rate": "24%",
        "single_filer": {
            "min_income": 100526,
            "max_income": 191950
        }
    },
    {
        "tax_rate": "32%",
        "single_filer": {
            "min_income": 191951,
            "max_income": 243725
        }
    },
    {
        "tax_rate": "35%",
        "single_filer": {
            "min_income": 243726,
            "max_income": 609350
        }
    },
    {
        "tax_rate": "37%",
        "single_filer": {
            "min_income": 609351,
            "max_income": null
        }
    }
]

export const LONG_TERM_TAX_SLAB: TaxBracket[] = [
    {
        "tax_rate": "0%",
        "single_filer": {
            "min_income": 0,
            "max_income": 47025
        }
    },
    {
        "tax_rate": "15%",
        "single_filer": {
            "min_income": 47026,
            "max_income": 518900
        }
    },
    {
        "tax_rate": "20%",
        "single_filer": {
            "min_income": 518901,
            "max_income": null
        }
    }
]
