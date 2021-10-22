/* @flow */

import { apiUrl } from '../constant';
export const methodName = 'GetLocations'

export const postBody = (locationDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
       <soapenv:Header />
       <soapenv:Body>
          <GetLocations>
             <Request>
                ${sourceCredentials}
                <XMLDetail>Full</XMLDetail>
                <CurrentPageIndex>0</CurrentPageIndex>
             </Request>
          </GetLocations>
       </soapenv:Body>
    </soapenv:Envelope>`
)
