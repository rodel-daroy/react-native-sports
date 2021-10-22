/* @flow */

const getClientIndexes = (clientIndexes) => {
    let clientIndexString = ''

    Object.keys(clientIndexes).map((key) => {
        clientIndexString = clientIndexString.concat(
            `<ClientIndex>
                <ID>${key}</ID>
                <Values>
                   <ClientIndexValue>
                      <ID>${clientIndexes[key]}</ID>
                   </ClientIndexValue>
               </Values>
            </ClientIndex>`)

        return clientIndexString
    })

    return clientIndexString
}

const composeClientIndexesTag = (clientIndexes) => {
    if (!clientIndexes) {
        return ''
    }

    const formatClientIndexes = clientIndexes.toJS()

    return `<ClientIndexes>
                ${getClientIndexes(formatClientIndexes)}
            </ClientIndexes>`
}

export default composeClientIndexesTag
