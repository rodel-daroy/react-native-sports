
import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'
import parsePaymentInfoAttributes from '../parsePaymentInfoAttributes';
import checkPaymentTest from '../checkPaymentTest';

type MBContractsDetails= {|
    contractId: string,
    clientId: string,
    locationId: ?string,
    promotionCode: string,
    paymentInfo: Object,
|}

export const methodName = 'PurchaseContracts'

export const postBody = (
    contractsDetails: MBContractsDetails,
    sourceCredentials: string,
    staffCredentials,
): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Header />
        <soapenv:Body>
            <PurchaseContracts xmlns="${apiUrl}">
                <Request>
                   ${sourceCredentials}
                   ${staffCredentials}
                   <XMLDetail>Full</XMLDetail>
                   <PageSize>50</PageSize>
                   <CurrentPageIndex>0</CurrentPageIndex>
                    ${checkPaymentTest(contractsDetails)}
                   ${addTagIfDefined('LocationID', contractsDetails.locationId)}
                   ${addTagIfDefined('ClientID', contractsDetails.clientId)}
                   ${addTagIfDefined('ContractID', contractsDetails.contractId)}
                   <FirstPaymentOccurs>Instant</FirstPaymentOccurs>
                   ${parsePaymentInfoAttributes(contractsDetails.paymentInfo)}
                   ${addTagIfDefined('PromotionCode', contractsDetails.promotionCode)}
               </Request>
           </PurchaseContracts>
       </soapenv:Body>
   </soapenv:Envelope>`
)