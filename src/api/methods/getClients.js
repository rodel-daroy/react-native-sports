/* @flow */

import { apiUrl } from '../constant';
import parseIdsToXMLAttributes from '../parseIdsToXMLAttributes'

type MBClientDetails = {|
    clientId: string,
    fields: Array<string>,
|}

export const methodName = 'GetClients'

export const postBody = (clientDetails: MBClientDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
        <soapenv:Header/>
        <soapenv:Body>
           	<GetClients>
              	<Request>
    				${sourceCredentials}
                 	<XMLDetail>Full</XMLDetail>
                 	<PageSize>10</PageSize>
                 	<CurrentPageIndex>0</CurrentPageIndex>
                 	<Fields>
                        ${parseIdsToXMLAttributes(clientDetails.fields, 'string')}
                 	</Fields>
                 	<ClientIDs>
                    	<string>${clientDetails.clientId}</string>
                 	</ClientIDs>
              	</Request>
           	</GetClients>
        </soapenv:Body>
    </soapenv:Envelope>`
)
