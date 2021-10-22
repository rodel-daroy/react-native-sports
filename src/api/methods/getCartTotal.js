/* @flow */

import { apiUrl } from '../constant';

type MBShoppingCartDetails= {|
    clientId: string,
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
                   <Fields>
                      <string>paymentcheck</string>
                   </Fields>
                   <InStore>true</InStore>
                   <Test>true</Test>
                   <CartItems>
                      <CartItem>
                         <Quantity>1</Quantity>
                         <Item xsi:type="Service">
                            <ID>${shoppingCartDetails.serviceId}</ID>
                         </Item>
                      </CartItem>
                   </CartItems>
               </Request>
           </CheckoutShoppingCart>
       </soapenv:Body>
   </soapenv:Envelope>`
)
