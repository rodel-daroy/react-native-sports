/* @flow */

import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'
import composeClientIndexesTag from '../composeClientIndexesTag'
import composeClientCreditCard from '../composeClientCreditCard'
import toBooleanString from '../toBooleanString'

type MBClientDetails = {|
    addressLine1: string,
    birthDate: Date,
    city: string,
    clientIndexes: Object,
    country: string,
    email: string,
    firstName: string,
    gender: string,
    homePhone: string,
    isProspect: boolean,
    isUpdate: boolean,
    lastName: string,
    mobilePhone: string,
    postalCode: string,
    state: string,
    clientCreditCard: Object,
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
                <UpdateAction>${clientDetails.isUpdate ? 'Update' : 'AddNew'}</UpdateAction>
                <Clients>
                    <Client>
                        ${addTagIfDefined('ID', clientDetails.iD)}
                        ${addTagIfDefined('FirstName', clientDetails.firstName)}
                        ${addTagIfDefined('LastName', clientDetails.lastName)}
                        ${addTagIfDefined('MobilePhone', clientDetails.mobilePhone)}
                        ${addTagIfDefined('HomePhone', clientDetails.homePhone)}
                        ${addTagIfDefined('Email', clientDetails.email)}
                        ${addTagIfDefined('AddressLine1', clientDetails.addressLine1)}
                        ${addTagIfDefined('City', clientDetails.city)}
                        ${addTagIfDefined('State', clientDetails.state)}
                        ${addTagIfDefined('Country', clientDetails.country)}
                        ${addTagIfDefined('PostalCode', clientDetails.postalCode)}
                        ${addTagIfDefined('Gender', clientDetails.gender)}
                        ${addTagIfDefined('IsProspect', toBooleanString(clientDetails.isProspect))}
                        ${composeClientIndexesTag(clientDetails.clientIndexes)}
                        ${composeClientCreditCard(clientDetails.clientCreditCard)}
                    </Client>
                </Clients>
                <Fields>
                    ${!clientDetails.clientIndexes ? '' : '<string>Clients.ClientIndexes</string>' }                   
                    ${!clientDetails.clientCreditCard ? '' : '<string>Clients.ClientCreditCard</string>' }                   
                </Fields>
            </Request>
        </AddOrUpdateClients>
    </soapenv:Body>
    </soapenv:Envelope>`
)
