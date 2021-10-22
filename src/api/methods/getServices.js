/* @flow */

import { apiUrl } from '../constant';
import  parseGetServiceAttributes from '../parseGetServiceAttritutes';

type MBServicesDetails= {|
    programIds: Array<string>,
    sessionTypeIds: Array<string>,
    serviceIds: Array<string>,
    classId: string,
    classScheduleId: string,
    sellOnline: boolean,
    locationId: string,
    pageSize: string,
    currentPage: string,
    hideRelatedPrograms: boolean,
|}

export const methodName = 'GetServices'

export const postBody = (serviceDetails: MBServicesDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
           <soapenv:Header />
           <soapenv:Body>
              <GetServices>
                 <Request>
                    ${sourceCredentials}
                    <XMLDetail>Full</XMLDetail>
                    <SellOnline>true</SellOnline>
                    ${parseGetServiceAttributes(serviceDetails)}
                 </Request>
              </GetServices>
           </soapenv:Body>
        </soapenv:Envelope>`
)


// import parseIdsToXMLAttributes from '../parseIdsToXMLAttributes'
//
// type MBServicesDetails= {|
//     locationId: string,
//     sessionTypeIds: Array<string>,
// |}
//
// export const methodName = 'GetServices'
//
// export const postBody = (serviceDetails: MBServicesDetails, sourceCredentials: string): string => (
//     `<?xml version="1.0" encoding="UTF-8"?>
//         <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
//            <soapenv:Header />
//            <soapenv:Body>
//               <GetServices>
//                  <Request>
//                     ${sourceCredentials}
//                     <XMLDetail>Full</XMLDetail>
//                     <PageSize>30</PageSize>
//                     <CurrentPageIndex>0</CurrentPageIndex>
//                     <SessionTypeIDs>
//                           ${parseIdsToXMLAttributes(serviceDetails.sessionTypeIds)}
//                     </SessionTypeIDs>
//                  </Request>
//               </GetServices>
//            </soapenv:Body>
//         </soapenv:Envelope>`
// )
