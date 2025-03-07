export const setConversionRate = (numberOfOrders,clicks) => {
    if(isNaN( numberOfOrders / clicks)) {
        const conversionRate = 0
        return conversionRate
    }
const conversionRate = ( numberOfOrders / clicks ) * 100
return parseFloat(conversionRate.toFixed(2))
}