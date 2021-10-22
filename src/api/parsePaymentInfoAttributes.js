import addTagIfDefined from './addTagIfDefined'

const parsePaymentInfoAttributes = (
    paymentInfo
) => {
    let retValue = '';

    if(paymentInfo !== undefined) {
        retValue += '<PaymentInfo xsi:type="' + paymentInfo.type + '">';
        for(let key in paymentInfo.values) {
            retValue += addTagIfDefined(key, paymentInfo.values[key]);
        }
        retValue += '</PaymentInfo>';
    }
    return retValue;
};

export default parsePaymentInfoAttributes