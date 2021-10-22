/* @flow */

import { apiUrl } from '../constant';
import parseIdsToXMLAttributes from '../parseIdsToXMLAttributes'

type MBStaffDetails= {|
    locationIds: Array<string>,
|}

export const methodName = 'GetStaff'

export const postBody = (staffDetails: MBStaffDetails, sourceCredentials: string, staffCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <GetStaff xmlns="${apiUrl}">
                <Request>
                    ${sourceCredentials}
                    ${staffCredentials}
                    <XMLDetail>Full</XMLDetail>
                    <PageSize>10</PageSize>
                    <CurrentPageIndex>0</CurrentPageIndex>
                    <Filters>
                        <StaffFilter>StaffViewable</StaffFilter>
                        <StaffFilter>AppointmentInstructor</StaffFilter>
                     </Filters>
                     <LocationIDs>
                        ${parseIdsToXMLAttributes(staffDetails.locationIds)}
                     </LocationIDs>
                 </Request>
             </GetStaff>
         </soapenv:Body>
     </soapenv:Envelope>`
)
