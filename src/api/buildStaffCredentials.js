/* @flow */

type MBStaffCredentials = {|
    siteID: string,
|}

const validateStaffCredentials = (staffCredentials: MBStaffCredentials): void => {
    if (!staffCredentials.siteID) {
        throw new Error('You must provide a siteID.')
    }
}

export default (staffCredentials: MBStaffCredentials) => {
    validateStaffCredentials(staffCredentials)

    return `<UserCredentials>
                <Username>_{{SourceName}}</Username>
                <Password>{{Password}}</Password>
                <SiteIDs>
                    <int>${staffCredentials.siteID}</int>
                </SiteIDs>
            </UserCredentials>`
}
