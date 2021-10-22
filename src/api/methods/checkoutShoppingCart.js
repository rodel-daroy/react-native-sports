/* @flow */
import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'
import parsePaymentInfoAttributes from '../parsePaymentInfoAttributes';
import parseAppointments from '../parseAppointments';
import checkPaymentTest from '../checkPaymentTest';

type MBShoppingCartDetails= {|
    clientId: string,
    locationId: ?string,
    serviceId: string,
    promotionCode: string,
    paymentInfo: Object,
|}

export const methodName = 'CheckoutShoppingCart'

export const postBody = (
    shoppingCartDetails: MBShoppingCartDetails,
    sourceCredentials: string,
    staffCredentials,
): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Header />
        <soapenv:Body>
            <CheckoutShoppingCart xmlns="${apiUrl}">
                <Request>
                    ${sourceCredentials}
                    ${staffCredentials}
                    <XMLDetail>Full</XMLDetail>
                    <InStore>true</InStore>
                    ${checkPaymentTest(shoppingCartDetails)}
                    ${addTagIfDefined('ClientID', shoppingCartDetails.clientId)}
                    <CartItems>
                        <CartItem>
                            <Quantity>1</Quantity>
                            <Item xsi:type="Service">
                                ${addTagIfDefined('ID', shoppingCartDetails.serviceId)}
                            </Item>
                            ${parseAppointments(shoppingCartDetails.appointments)}
                            ${addTagIfDefined('DiscountAmount', shoppingCartDetails.discountAmount)}
                            ${addTagIfDefined('Quantify', shoppingCartDetails.quantify)}
                        </CartItem>
                    </CartItems>
                    ${addTagIfDefined('LocationID', shoppingCartDetails.locationId)}
                    <Payments>
                        ${parsePaymentInfoAttributes(shoppingCartDetails.paymentInfo)}
                    </Payments>                    
                   ${addTagIfDefined('PromotionCode', shoppingCartDetails.promotionCode)}
               </Request>
           </CheckoutShoppingCart>
       </soapenv:Body>
   </soapenv:Envelope>`
)




/*
import addTagIfDefined from '../addTagIfDefined'
type MBShoppingCartDetails= {|
    amount: string,
    clientId: string,
    locationId: ?string,
    serviceId: string,
|}

export const methodName = 'CheckoutShoppingCart'

export const postBody = (
    shoppingCartDetails: MBShoppingCartDetails,
    sourceCredentials: string,
    staffCredentials,
): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Header />
        <soapenv:Body>
            <CheckoutShoppingCart xmlns="${apiUrl}">
                <Request>
                   ${sourceCredentials}
                   ${staffCredentials}
                   <XMLDetail>Full</XMLDetail>
                   <CurrentPageIndex>0</CurrentPageIndex>
                   <ClientID>${shoppingCartDetails.clientId}</ClientID>
                   <CartItems>
                      <CartItem>
                         <Quantity>1</Quantity>
                         <Item xsi:type="Service">
                            <ID>${shoppingCartDetails.serviceId}</ID>
                         </Item>
                      </CartItem>
                   </CartItems>
                   ${addTagIfDefined('LocationID', shoppingCartDetails.locationId)}
                   <Payments>
                      <PaymentInfo xsi:type="DebitAccountInfo">
                         <Amount>${shoppingCartDetails.amount}</Amount>
                      </PaymentInfo>
                   </Payments>
               </Request>
           </CheckoutShoppingCart>
       </soapenv:Body>
   </soapenv:Envelope>`
)
*/
