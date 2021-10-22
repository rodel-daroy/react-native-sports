/* @flow */

import { apiUrl } from '../constant';
import addListIfDefined from '../addTagListIfDefined'
import addTagIfDefined from '../addTagIfDefined'

type MBServiceDetails = {|
    classId: string,
    clientId: string,
    programIds: ?Array<string>,
    showActiveOnly: string
|}

export const methodName = 'GetClientServices'

export const postBody = (serviceDetails: MBServiceDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
       <soapenv:Header />
       <soapenv:Body>
          <GetClientServices>
             <Request>
                ${sourceCredentials}
                <ClientID>${serviceDetails.clientId}</ClientID>
                ${addTagIfDefined('ClassID', serviceDetails.classId)}
                ${addListIfDefined('ProgramIDs', 'int', serviceDetails.programIds)}
                ${addTagIfDefined('ShowActiveOnly', serviceDetails.showActiveOnly)}
             </Request>
          </GetClientServices>
       </soapenv:Body>
    </soapenv:Envelope>`
)
