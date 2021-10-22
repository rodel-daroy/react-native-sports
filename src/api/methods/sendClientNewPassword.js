/* @flow */

import { apiUrl } from '../constant';
type MBUserDetails = {|
    email: string,
    firstName: string,
    lastName: string,
|}

export const methodName = 'SendUserNewPassword'

export const postBody = (userDetails: MBUserDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header />
        <soapenv:Body>
            <SendUserNewPassword xmlns="${apiUrl}">
                <Request>
                    ${sourceCredentials}
                    <UserFirstName>${userDetails.firstName}</UserFirstName>
                    <UserLastName>${userDetails.lastName}</UserLastName>
                    <UserEmail>${userDetails.email}</UserEmail>
                </Request>
             </SendUserNewPassword>
        </soapenv:Body>
    </soapenv:Envelope>`
)
