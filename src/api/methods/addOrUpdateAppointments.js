/* @flow */
import { apiUrl } from '../constant';
import addTagIfDefined from '../addTagIfDefined'

type MBAppointementDetails = {|
    appointmentId: ?string,
    clientId: ?string,
    isCancel: ?boolean,
    isUpdate: boolean,
    lateCancel: ?boolean,
    locationId: ?string,
    sessionTypeId: ?string,
    staffId: ?string,
    startDateTime: ?string,
|}

export const methodName = 'AddOrUpdateAppointments'

const getAppointmentData = (appointmentDetails: MBAppointementDetails) => appointmentDetails.isCancel ?
    `
        <ID>${appointmentDetails.appointmentId}</ID>
        <Execute>${appointmentDetails.lateCancel ? 'latecancel' : 'cancel'}</Execute>
    ` :
    `
        <StartDateTime>${appointmentDetails.startDateTime}</StartDateTime>
        <Location>
            <ID>${appointmentDetails.locationId}</ID>
        </Location>
        <Staff>
            <ID>${appointmentDetails.staffId}</ID>
        </Staff>
        <Client>
            <ID>${appointmentDetails.clientId}</ID>
        </Client>
        <SessionType>
            <ID>${appointmentDetails.sessionTypeId}</ID>
        </SessionType>
    `

export const postBody = (appointmentDetails: MBAppointementDetails, sourceCredentials: string): string => (
    `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Header />
       <soapenv:Body>
          <AddOrUpdateAppointments xmlns="${apiUrl}">
             <Request>
                ${sourceCredentials}
                <XMLDetail>Full</XMLDetail>
                <PageSize>10</PageSize>
                <CurrentPageIndex>0</CurrentPageIndex>
                <UpdateAction>${appointmentDetails.isUpdate || appointmentDetails.isCancel ?
                    'Update' :
                    'AddNew'
                }</UpdateAction>
                <Appointments>
                    <Appointment>
                        ${getAppointmentData(appointmentDetails)}
                    </Appointment>
                </Appointments>
                ${addTagIfDefined('ApplyPayment', appointmentDetails.applyPayment)}
                <SendEmail>true</SendEmail>
             </Request>
          </AddOrUpdateAppointments>
       </soapenv:Body>
    </soapenv:Envelope>`
)
