export const checkBlacklistedKeyInPayload = (payloadKeys: string[] = [], whitelistedKeys: string[] = [])
    : string[] => {
    return payloadKeys.filter((key) => !whitelistedKeys.includes(key));
}