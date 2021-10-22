/* @flow */

import { apiUrl } from '../constant';
type MBClientDetails = {|
    clientId: string,
|}

export const methodName = 'GetClientAccountBalances'

export const postBody = (clientDetails: MBClientDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
    	<soapenv:Header/>
    	<soapenv:Body>
    		<GetClientAccountBalances>
    			<Request>
    				${sourceCredentials}
    				<ClientIDs>
    					<string>${clientDetails.clientId}</string>
    				</ClientIDs>
    			</Request>
    		</GetClientAccountBalances>
    	</soapenv:Body>
	</soapenv:Envelope>`
)
