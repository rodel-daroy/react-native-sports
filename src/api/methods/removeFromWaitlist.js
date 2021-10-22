/* @flow */

import { apiUrl } from '../constant';
import addTagListIfDefined from '../addTagListIfDefined'

type WaitlistEntries = {|
    entryIDs: Array<number>,
|}

export const methodName = 'RemoveFromWaitlist'

export const postBody = (waitlistEntriesDetails: WaitlistEntries, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Header />
       <soapenv:Body>
          <RemoveFromWaitlist xmlns="${apiUrl}">
             <Request>
                ${sourceCredentials}
                ${addTagListIfDefined('WaitlistEntryIDs', 'int', waitlistEntriesDetails.entryIDs)}
             </Request>
          </RemoveFromWaitlist>
       </soapenv:Body>
    </soapenv:Envelope>`
)
