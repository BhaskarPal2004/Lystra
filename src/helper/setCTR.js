export const setCTR = (views,clicks) => {
    if(isNaN( clicks / views )) {
        const CTR = 0
        return CTR
    }
    const CTR = ( clicks / views ) * 100
    return parseFloat(CTR.toFixed(2))
}