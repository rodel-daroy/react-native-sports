/* @flow */

import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'
import toBooleanString from '../toBooleanString'

type MBProgramDetails = {|
    onlineOnly: ?boolean,
    scheduleType: string,
|}

export const methodName = 'GetPrograms'

export const postBody = (programDetails: MBProgramDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
       <soapenv:Header />
       <soapenv:Body>
          <GetPrograms>
             <Request>
                ${sourceCredentials}
                <XMLDetail>Full</XMLDetail>
                <CurrentPageIndex>0</CurrentPageIndex>
                <ScheduleType>${programDetails.scheduleType}</ScheduleType>
                ${addTagIfDefined('OnlineOnly', toBooleanString(programDetails.onlineOnly))}
             </Request>
          </GetPrograms>
       </soapenv:Body>
    </soapenv:Envelope>`
)
