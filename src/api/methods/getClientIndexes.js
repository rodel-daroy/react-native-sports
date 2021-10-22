/* @flow */

import { apiUrl } from '../constant';
export const methodName = 'GetClientIndexes'

export const postBody = (clientIndexesDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
       <soapenv:Header />
       <soapenv:Body>
          <GetClientIndexes>
             <Request>
                ${sourceCredentials}
             </Request>
          </GetClientIndexes>
       </soapenv:Body>
    </soapenv:Envelope>`
)
