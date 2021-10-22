/* @flow */

import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'
import addTagListIfDefined from '../addTagListIfDefined'
import parseIdsToXMLAttributes from '../parseIdsToXMLAttributes'
import toBooleanString from '../toBooleanString'

type MBClassDetails = {|
    classIds: ?Array<string>,
    clientId: ?string,
    endDateTime: ?Date,
    hideCanceledClasses: ?boolean,
    locationIds: Array<string>,
    schedulingWindow: ?boolean,
    sessionTypeIds: ?Array<string>,
    staffIds: ?Array<string>,
    startDateTime: Date,
|}

export const methodName = 'GetClasses'

export const postBody = (classDetails: MBClassDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
        <soapenv:Header/>
        <soapenv:Body>
            <GetClasses>
                <Request>
                    ${sourceCredentials}
                    ${addTagIfDefined('HideCanceledClasses', toBooleanString(classDetails.hideCanceledClasses))}
                    ${addTagIfDefined('ClientID', classDetails.clientId)}
                    ${addTagIfDefined('SchedulingWindow', toBooleanString(classDetails.schedulingWindow))}
                    ${addTagIfDefined('StartDateTime', classDetails.startDateTime)}
                    ${addTagIfDefined('EndDateTime', classDetails.endDateTime)}
                    ${addTagListIfDefined('ClassIDs', 'int', classDetails.classIds)}
                    <LocationIDs>
                    	${parseIdsToXMLAttributes(classDetails.locationIds)}
                	</LocationIDs>
                    ${addTagListIfDefined('SessionTypeIDs', 'int', classDetails.sessionTypeIds)}
                    ${addTagListIfDefined('StaffIDs', 'int', classDetails.staffIds)}
                    <XMLDetail>Full</XMLDetail>
                </Request>
            </GetClasses>
        </soapenv:Body>
    </soapenv:Envelope>`
)
