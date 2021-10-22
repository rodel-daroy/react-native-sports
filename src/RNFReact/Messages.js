/* @flow */

let messagesStore = {}

const convertMessages = (messages) =>
     Object.keys(messages).reduce((previousValue, key) =>
         ({...previousValue, [key]: {id: key, defaultMessage: messages[key]}})
    , {})


export default {
    create(messages: any) {
        const convertedMessages = convertMessages(messages)

        messagesStore = {...messagesStore, ...convertedMessages}

        return Object.freeze(convertedMessages)
    },
    getMessages: () => Object.keys(messagesStore).reduce((previousValue, currentValue) => ({
        ...previousValue,
        [messagesStore[currentValue].id]: messagesStore[currentValue].defaultMessage,
    }), {}),
}
