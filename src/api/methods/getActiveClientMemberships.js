/* @flow */

import { apiUrl } from '../constant';
type MBClientDetails = {|
    clientId: string,
|}

export const methodName = 'GetActiveClientMemberships'

export const postBody = (clientDetails: MBClientDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
    	<soapenv:Header/>
    	<soapenv:Body>
    	<GetActiveClientMemberships>
    	  <Request>
    	    ${sourceCredentials}
    	    <ClientID>${clientDetails.clientId}</ClientID>
    	  </Request>
    	</GetActiveClientMemberships>
    	</soapenv:Body>
    </soapenv:Envelope>`
)
