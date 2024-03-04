export const getEndingDate = (unix_timestamp:bigint) => {
    let lotteryDate = new Date(Number(unix_timestamp) * 1000);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let currentDate = new Date();
    const diffDays = Math.round(Math.abs((+lotteryDate - +currentDate) / oneDay));
    return diffDays;
}

export const getTotalWinningPrice = (winningPrice:any) => {
    return winningPrice?.reduce((a:any, b:any) => {
        const priceA = parseInt(a.price) || 0;
        const priceB = parseInt(b.price) || 0;
        return priceA + priceB;
    }, 0)
}

export const getRandomNumberInRange = (startNum:number, endNum:number) => {
    return Math.floor(Math.random() * (endNum - startNum + 1)) + startNum; 
}