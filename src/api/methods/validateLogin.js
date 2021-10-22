/* @flow */

import { apiUrl } from '../constant';
type MBloginDetails = {|
    password: string,
    userName: string,
|}

export const methodName = 'ValidateLogin'

export const postBody = (loginDetails: MBloginDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header />
        <soapenv:Body>
            <ValidateLogin xmlns="${apiUrl}">
                <Request>
                    ${sourceCredentials}
                   <Username>${loginDetails.userName}</Username>
                   <Password>${loginDetails.password}</Password>
                </Request>
             </ValidateLogin>
        </soapenv:Body>
    </soapenv:Envelope>`
)
