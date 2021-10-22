/* @flow */

import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'
import toBooleanString from '../toBooleanString'

type MBClassAndClientDetails = {|
    classId: number,
    clientId: string,
    lateCancel: ?boolean,
|}

export const methodName = 'RemoveClientsFromClasses'

export const postBody = (classAndCliendDetails: MBClassAndClientDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
       <soapenv:Header />
       <soapenv:Body>
          <RemoveClientsFromClasses>
             <Request>
                ${sourceCredentials}
                <XMLDetail>Bare</XMLDetail>
                <PageSize>10</PageSize>
                <CurrentPageIndex>0</CurrentPageIndex>
                <ClientIDs>
                   <string>${classAndCliendDetails.clientId}</string>
                </ClientIDs>
                <ClassIDs>
                   <int>${classAndCliendDetails.classId}</int>
                </ClassIDs>
                <SendEmail>true</SendEmail>
                ${addTagIfDefined('LateCancel', toBooleanString(classAndCliendDetails.lateCancel))}
             </Request>
          </RemoveClientsFromClasses>
       </soapenv:Body>
    </soapenv:Envelope>`
)
