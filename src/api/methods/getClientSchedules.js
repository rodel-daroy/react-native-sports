/* @flow */

import { apiUrl } from '../constant';
import toBooleanString from '../toBooleanString'

type MBGetClientScheduleQuery = {|
    clientId: string,
    endDateTime: Date,
    schedulingWindow: boolean,
    startDateTime: Date,
|}

export const methodName = 'GetClientSchedule'

export const postBody = (scheduleQuery: MBGetClientScheduleQuery, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
        <soapenv:Header/>
        <soapenv:Body>
            <GetClientSchedule>
                <Request>
                    ${sourceCredentials}
                    <XMLDetail>Full</XMLDetail>
                    <ClientID>${scheduleQuery.clientId}</ClientID>
                    <SchedulingWindow>${toBooleanString(scheduleQuery.schedulingWindow)}</SchedulingWindow>
                    <StartDate>${scheduleQuery.startDateTime}</StartDate>
                    <EndDate>${scheduleQuery.endDateTime}</EndDate>
                </Request>
            </GetClientSchedule>
        </soapenv:Body>
    </soapenv:Envelope>`
)
