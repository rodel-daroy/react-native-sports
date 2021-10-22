import R from 'ramda'

const checkPaymentTest = (
    shoppingCartDetails
) => {
    if(R.isNil(shoppingCartDetails)){
        return "";
    }
    let retValue = "";
    if(shoppingCartDetails.test !== undefined && shoppingCartDetails.test) {
        retValue += '<Test>true</Test>'
    } else {
        retValue += '<Test>false</Test>'
    }
    if(shoppingCartDetails.paymentCheck !== undefined && shoppingCartDetails.paymentCheck) {
        retValue += '<Fields><string>paymentcheck</string></Fields>'
    }
    return retValue;
}

export default checkPaymentTest