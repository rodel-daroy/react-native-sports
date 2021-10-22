import R from 'ramda'
import parseGetServiceAttributes from "./parseGetServiceAttritutes";

const formatIds = (sessionTypeIds) => sessionTypeIds.join('');

const joinIds = (ids, elementType) => ids.map((id) => `<${elementType}>${id}</${elementType}>`)

const extractIds = R.compose(
    formatIds,
    joinIds,
);

const parseAppointments = (
    appointmentDetail
) => {
    if(R.isNil(appointmentDetail)){
        return "";
    }
    let retValue = "";
    retValue = "<Appointments>";
    if(appointmentDetail.startDateTime !== undefined){
        retValue += '<StartDateTime>' + appointmentDetail.startDateTime + '</StartDateTime>';
    }
    if(appointmentDetail.staffID !== undefined){
        retValue += '<Staff><ID>' + appointmentDetail.staffID + '</ID></Staff>'
    }
    if(appointmentDetail.locationId !== undefined){
        retValue += '<Location><ID>' + appointmentDetail.locationId + '</ID></Location>'
    }
    if(appointmentDetail.sessionTypeId !== undefined){
        retValue += '<SessionType><ID>' + appointmentDetail.sessionTypeId + '</ID></SessionType>'
    }
    retValue += "</Appointments>";
    return retValue;
}

export default parseAppointments