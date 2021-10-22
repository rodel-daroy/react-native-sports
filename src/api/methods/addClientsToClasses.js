/* @flow */

import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'

type MBClassAndClientDetails = {|
    classId: number,
    clientId: string,
    clientServiceId: string,
    waitlist: boolean,
|}

export const methodName = 'AddClientsToClasses'

export const postBody = (classAndCliendDetails: MBClassAndClientDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Header />
       <soapenv:Body>
          <AddClientsToClasses xmlns="${apiUrl}">
             <Request>
                ${sourceCredentials}
                <XMLDetail>Full</XMLDetail>
                <PageSize>10</PageSize>
                <CurrentPageIndex>0</CurrentPageIndex>
                <ClientIDs>
                   <string>${classAndCliendDetails.clientId}</string>
                </ClientIDs>
                <ClassIDs>
                   <int>${classAndCliendDetails.classId}</int>
                </ClassIDs>
                <ClientServiceID>${classAndCliendDetails.clientServiceId}</ClientServiceID>
                <Test>false</Test>
                <SendEmail>true</SendEmail>
                ${addTagIfDefined('Waitlist', classAndCliendDetails.waitlist)}
             </Request>
          </AddClientsToClasses>
       </soapenv:Body>
    </soapenv:Envelope>`
)
