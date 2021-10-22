import addTagIfDefined from './addTagIfDefined'

const composeClientCreditCard = (clientCreditCard) => {
    if (!clientCreditCard) {
        return ''
    }
    let retVal =  `<ClientCreditCard>
                ${addTagIfDefined('CardNumber', clientCreditCard.cardNumber)}
                ${addTagIfDefined('CardHolder', clientCreditCard.cardName)}
                ${addTagIfDefined('Address', clientCreditCard.address)}
                ${addTagIfDefined('City', clientCreditCard.city)}
                ${addTagIfDefined('State', clientCreditCard.state)}
                ${addTagIfDefined('PostalCode', clientCreditCard.postalCode)}
                ${addTagIfDefined('ExpMonth', clientCreditCard.expMonth)}
                ${addTagIfDefined('ExpYear', clientCreditCard.expYear)}
            </ClientCreditCard>`
    return retVal;
}

export default composeClientCreditCard
