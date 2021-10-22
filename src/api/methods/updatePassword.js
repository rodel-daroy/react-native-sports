/* @flow */

import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'
type MBClientDetails = {|
    clientId: string,
    password: string,
    userName: string,
|}

export const methodName = 'AddOrUpdateClients'

export const postBody = (clientDetails: MBClientDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header />
    <soapenv:Body>
        <AddOrUpdateClients xmlns="${apiUrl}">
            <Request>
                ${sourceCredentials}
                <UpdateAction>'Update'</UpdateAction>
                <Clients>
                    <Client>
                        <ID>${clientDetails.clientId}</ID>
                        ${addTagIfDefined('Username', clientDetails.userName)}
                        ${addTagIfDefined('Email', clientDetails.userName)}
                        <Password>${clientDetails.password}</Password>
                    </Client>
                </Clients>
            </Request>
        </AddOrUpdateClients>
    </soapenv:Body>
    </soapenv:Envelope>`
)
