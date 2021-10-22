/* @flow */

type MBSourceCredentials = {|
    siteID: string,
|}

const validateSourceCredentials = (sourceCredentials: MBSourceCredentials): void => {
    if (!sourceCredentials.siteID) {
        throw new Error('You must provide a siteID.')
    }
}

export default (sourceCredentials: MBSourceCredentials) => {
    validateSourceCredentials(sourceCredentials)

    return `<SourceCredentials>
                <SourceName>{{SourceName}}</SourceName>
                <Password>{{Password}}</Password>
                <SiteIDs>
                    <int>${sourceCredentials.siteID}</int>
                </SiteIDs>
            </SourceCredentials>`
}
