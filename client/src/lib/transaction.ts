import { SendMoneyFormType } from "@/types/transaction";

export const transformTxnPayload = (payload: SendMoneyFormType) => {
    return {
        description: payload.description,
        sourceAccount: payload.sourceAccount,
    }
}   