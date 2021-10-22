/* @flow */

import { apiUrl } from '../constant';
type MBClientDetails = {|
    clientId: string,
    startDate: Date,
|}

export const methodName = 'GetClientPurchases'

export const postBody = (clientDetails: MBClientDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
    	<soapenv:Header/>
    	<soapenv:Body>
     		<GetClientPurchases>
            	<Request>
              		${sourceCredentials}
    	           	<XMLDetail>Full</XMLDetail>
    	           	<PageSize>1000</PageSize>
    	           	<CurrentPageIndex>0</CurrentPageIndex>
    	           	<ClientID>${clientDetails.clientId}</ClientID>
    	           	<StartDate>${clientDetails.startDate}</StartDate>
            	</Request>
         	</GetClientPurchases>
      	</soapenv:Body>
    </soapenv:Envelope>`
)
