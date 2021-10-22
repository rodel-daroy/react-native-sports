/* @flow */

import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'
import parseIdsToXMLAttributes from '../parseIdsToXMLAttributes'

type MBBookableItemsDetails = {|
    endDate: string,
    sessionTypeIds: Array<string>,
    startDate: string,
|}

export const methodName = 'GetBookableItems'

export const postBody = (bookableItemsDetails: MBBookableItemsDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
       <soapenv:Header />
       <soapenv:Body>
          <GetBookableItems>
             <Request>
                ${sourceCredentials}
                <XMLDetail>Full</XMLDetail>
                <CurrentPageIndex>0</CurrentPageIndex>
                <SessionTypeIDs>${parseIdsToXMLAttributes(bookableItemsDetails.sessionTypeIds)}</SessionTypeIDs>
                ${addTagIfDefined('StartDate', bookableItemsDetails.startDate)}
                ${addTagIfDefined('EndDate', bookableItemsDetails.endDate)}
             </Request>
          </GetBookableItems>
       </soapenv:Body>
    </soapenv:Envelope>`
)
