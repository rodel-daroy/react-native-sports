
import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'
import parseIdsToXMLAttributes from '../parseIdsToXMLAttributes'

type MBContractsDetails= {|
    contractIds: Array<string>,
    locationId: string,
|}

export const methodName = 'GetContracts'

export const postBody = (contractsDetails: MBContractsDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="${apiUrl}">
           <soapenv:Header />
           <soapenv:Body>
              <GetContracts>
                 <Request>
                    ${sourceCredentials}
                    <XMLDetail>Full</XMLDetail>
                    <PageSize>50</PageSize>
                    <CurrentPageIndex>0</CurrentPageIndex>
                    <SoldOnline>true</SoldOnline>
                    ${addTagIfDefined('LocationID', contractsDetails.locationId)}
                    <ContractIDs>
                        ${parseIdsToXMLAttributes(contractsDetails.contractIds)}
                    </ContractIDs>
                 </Request>
              </GetContracts>
           </soapenv:Body>
        </soapenv:Envelope>`
)
