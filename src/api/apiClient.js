/* @flow */

import buildSourceCredentials from './buildSourceCredentials'
import buildStaffCredentials from './buildStaffCredentials'
import camelizeResponse from './camelizeResponse'
import convertResponseToImmutable from './convertResponseToImmutable'
import parseXmlResponseToJson from './parseXmlResponseToJson'
import sanitizeResponseFormat from './sanitizeResponseFormat'
import {
    auth,
    base,
    body,
    createFetch,
    createStack,
    header,
    method,
    recv,
} from 'http-client'
import { apiUrl } from './constant';
import * as addClientsToClasses from './methods/addClientsToClasses'
import * as addOrUpdateAppointments from './methods/addOrUpdateAppointments'
import * as addOrUpdateClients from './methods/addOrUpdateClients'
import * as checkoutShoppingCart from './methods/checkoutShoppingCart'
import * as getActiveClientMemberships from './methods/getActiveClientMemberships'
import * as getBookableItems from './methods/getBookableItems'
import * as getCartTotal from './methods/getCartTotal'
import * as getClasses from './methods/getClasses'
import * as getClientAccountBalances from './methods/getClientAccountBalances'
import * as getClientIndexes from './methods/getClientIndexes'
import * as getClientPurchases from './methods/getClientPurchases'
import * as getClients from './methods/getClients'
import * as getClientSchedules from './methods/getClientSchedules'
import * as getClientServices from './methods/getClientServices'
import * as getLocations from './methods/getLocations'
import * as getPrograms from './methods/getPrograms'
import * as getServices from './methods/getServices'
import * as getSessionTypes from './methods/getSessionTypes'
import * as getStaff from './methods/getStaff'
import * as removeClientsFromClasses from './methods/removeClientsFromClasses'
import * as sendClientNewPassword from './methods/sendClientNewPassword'
import * as updatePassword from './methods/updatePassword'
import * as validateLogin from './methods/validateLogin'
import * as getContracts from './methods/getContracts'
import * as purchaseContracts from './methods/purchaseContracts'
import * as getWaitlistEntries from './methods/getWaitlistEntries'
import * as removeFromWaitlist from './methods/removeFromWaitlist';

export const APPOINTMENT = 'AppointmentService'
export const CLASS = 'ClassService'
export const CLIENT = 'ClientService'
export const SALE = 'SaleService'
export const SITE = 'SiteService'
export const STAFF = 'StaffService'

type SoapMethod = {|
    methodName: string,
    postBody: any,
|}

const BXR_SITE_ID = '427862'

const sourceCredentials = buildSourceCredentials({
    siteID: BXR_SITE_ID,
})

const staffCredentials = buildStaffCredentials({
    siteID: BXR_SITE_ID,
})

const responseStack = (soapMethod: SoapMethod) => createStack(
    recv((response) => response.text()),
    recv(parseXmlResponseToJson),
    recv(camelizeResponse),
    recv(convertResponseToImmutable),
    recv(sanitizeResponseFormat(soapMethod.methodName)),
)

const createSoapRequest = (soapMethod: SoapMethod, mbService: string) => (args?: any) => (
    createFetch(
        base(`http://35.176.183.254:8081/${mbService}`),
        auth('Basic Uk5GRGlnaXRhbDpZYiU4NyotNlhEKG5+WC9D'),
        method('POST'),
        header('SOAPAction', `${apiUrl}/${soapMethod.methodName}`),
        body(soapMethod.postBody(args, sourceCredentials, staffCredentials), 'text/xml; charset=utf-8'),
        responseStack(soapMethod),
    )()
)

export default ({
    addOrUpdateClients: createSoapRequest(addOrUpdateClients, CLIENT),
    validateLogin: createSoapRequest(validateLogin, CLIENT),
    getClasses: createSoapRequest(getClasses, CLASS),
    getClients: createSoapRequest(getClients, CLIENT),
    getClientServices: createSoapRequest(getClientServices, CLIENT),
    addClientsToClasses: createSoapRequest(addClientsToClasses, CLASS),
    getActiveClientMemberships: createSoapRequest(getActiveClientMemberships, CLIENT),
    getClientIndexes: createSoapRequest(getClientIndexes, CLIENT),
    getClientPurchases: createSoapRequest(getClientPurchases, CLIENT),
    getClientAccountBalances: createSoapRequest(getClientAccountBalances, CLIENT),
    getClientSchedules: createSoapRequest(getClientSchedules, CLIENT),
    removeClientsFromClasses: createSoapRequest(removeClientsFromClasses, CLASS),
    getPrograms: createSoapRequest(getPrograms, SITE),
    getLocations: createSoapRequest(getLocations, SITE),
    getSessionTypes: createSoapRequest(getSessionTypes, SITE),
    getBookableItems: createSoapRequest(getBookableItems, APPOINTMENT),
    addOrUpdateAppointments: createSoapRequest(addOrUpdateAppointments, APPOINTMENT),
    sendClientNewPassword: createSoapRequest(sendClientNewPassword, CLIENT),
    updatePassword: createSoapRequest(updatePassword, CLIENT),
    checkoutShoppingCart: createSoapRequest(checkoutShoppingCart, SALE),
    getServices: createSoapRequest(getServices, SALE),
    getCartTotal: createSoapRequest(getCartTotal, SALE),
    getStaff: createSoapRequest(getStaff, STAFF),
    getContracts: createSoapRequest(getContracts, SALE),
    purchaseContracts: createSoapRequest(purchaseContracts, SALE),
    getWaitlistEntries: createSoapRequest(getWaitlistEntries, CLASS),
    removeFromWaitlist: createSoapRequest(removeFromWaitlist, CLASS),
})
