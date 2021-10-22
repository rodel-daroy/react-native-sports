/* @flow */

import R from 'ramda'

const formatIds = (sessionTypeIds) => sessionTypeIds.join('');

const joinIds = (ids, elementType) => ids.map((id) => `<${elementType}>${id}</${elementType}>`)

const extractIds = R.compose(
    formatIds,
    joinIds,
);

const parseGetServiceAttributes = (
    serviceDetails
) => {
    let retValue = '';
    if(serviceDetails.programIds !== undefined){
        retValue += '<ProgramIDs>' + extractIds(serviceDetails.programIds, 'int') + '</ProgramIDs>'
    }
    if(serviceDetails.sessionTypeIds !== undefined){
        retValue += '<SessionTypeIDs>' + extractIds(serviceDetails.sessionTypeIds, 'int') + '</SessionTypeIDs>'
    }
    if(serviceDetails.serviceIds !== undefined){
        retValue += '<ServiceIDs>' + extractIds(serviceDetails.serviceIds, 'string') + '</ServiceIDs>'
    }
    if(serviceDetails.classId !== undefined){
        retValue += '<ClassID>' + serviceDetails.classId + '</ClassID>'
    }
    if(serviceDetails.classScheduleId !== undefined){
        retValue += '<ClassScheduleID>' + serviceDetails.classScheduleId + '</ClassScheduleID>'
    }
    if(serviceDetails.sellOnline !== undefined){
        retValue += '<SellOnline>' + serviceDetails.sellOnline + '</SellOnline>'
    }
    if(serviceDetails.locationId !== undefined){
        retValue += '<LocationID>' + serviceDetails.locationId + '</LocationID>'
    }
    if(serviceDetails.pageSize !== undefined){
        retValue += '<PageSize>' + serviceDetails.pageSize + '</PageSize>'
    }
    if(serviceDetails.currentPage !== undefined){
        retValue += '<CurrentPageIndex>' + serviceDetails.currentPage + '</CurrentPageIndex>'
    }
    if(serviceDetails.hideRelatedPrograms !== undefined){
        retValue += '<HideRelatedPrograms>' + serviceDetails.hideRelatedPrograms + '</HideRelatedPrograms>'
    }
    return retValue;
}

export default parseGetServiceAttributes
