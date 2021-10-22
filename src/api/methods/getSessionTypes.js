/* @flow */

import { apiUrl } from '../constant';
import parseIdsToXMLAttributes from '../parseIdsToXMLAttributes'

type MBSessionTypeDetails = {|
    programIds: Array<string>,
|}

export const methodName = 'GetSessionTypes'

export const postBody = (sessionTypeDetails: MBSessionTypeDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
       <soapenv:Header />
       <soapenv:Body>
          <GetSessionTypes>
             <Request>
                ${sourceCredentials}
                <XMLDetail>Full</XMLDetail>
                <OnlineOnly>true</OnlineOnly>
                <ProgramIDs>
            	      ${parseIdsToXMLAttributes(sessionTypeDetails.programIds)}
	         	</ProgramIDs>
             </Request>
          </GetSessionTypes>
       </soapenv:Body>
    </soapenv:Envelope>`
)
