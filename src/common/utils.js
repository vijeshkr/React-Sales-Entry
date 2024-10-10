// Rupee symbol
export const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: "currency",
        currency: 'INR',
        minimumFractionDigits: 2
    });

    return formatter.format(num);
}

// Function to generate a unique vr_no
export const generateUniqueVrNo = (existingData) => {
    const existingVrNos = new Set(existingData.map(item => item.vr_no));
    let newVrNo = 1;

    while (existingVrNos.has(newVrNo)){
        newVrNo ++ ;
    }

    return newVrNo;
}