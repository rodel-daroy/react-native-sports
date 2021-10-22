/* @flow */

import { apiUrl } from '../constant';

type MBWaitlistEntries = {|
    clientId: string,
|}

export const methodName = 'GetWaitlistEntries'

export const postBody = (waitlistEntriesDetails: MBWaitlistEntries, sourceCredentials: string, staffCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Header />
       <soapenv:Body>
          <GetWaitlistEntries xmlns="${apiUrl}">
             <Request>
                ${sourceCredentials}
                ${staffCredentials}
                <XMLDetail>Full</XMLDetail>
                <PageSize>10</PageSize>
                <CurrentPageIndex>0</CurrentPageIndex>
                <ClientIDs>
                   <string>${waitlistEntriesDetails.clientId}</string>
                </ClientIDs>
             </Request>
          </GetWaitlistEntries>
       </soapenv:Body>
    </soapenv:Envelope>`
)
