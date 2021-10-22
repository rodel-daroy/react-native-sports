/* @flow */

import React, {Component} from 'react'
import background9 from '../images/background9.jpg'
import colorConstants from '../colorConstants'
import MediumText from '../common/text/MediumText'
import ScreenContainer from '../common/ScreenContainer'
import {
    createComponent,
    Image,
    MapView,
    StyleSheet,
    VerticalLayout,
    Touchable,
} from '../RNFReact'
import {Platform, Linking} from 'react-native'
import OpenMap from 'react-native-open-maps';


const styles = StyleSheet.create({
    info: {
        fontSize: 19,
        color: colorConstants.BXR_TEXT,
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        width: null,
        height: null,
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, .6)',
    },
    mapImageContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
        width: null,
        height: null,
    },
    callOutContainer: {
        padding: 10,
        backgroundColor: 'rgb(190, 190, 190)',
        borderRadius: 5,
    },
})

const ADDRESS =
`
BXR London
24 Paddington Street
London W1U 5OY

T: 02031463436

Opening hours:
Mon - Fri: 06:30am - 09:30pm
Sat: 08:00am - 08:00pm
Sun: 08:00am - 06:00pm
`

const LocationText = () => (
    <VerticalLayout>
        <MediumText style={styles.info}>
            {ADDRESS}
        </MediumText>
    </VerticalLayout>
)

const markers = [
    {
        latitude: 51.5205663,
        longitude: -0.1555657,
        name: 'BXR London',
        address: {
            name: '74-76 Chiltern Street',
            town: 'Marylebone',
            postcode: 'London W1U',
        },
    },
]

const BXR_LONDON_COORDINATES = {
    latitude: 51.520840,
    longitude: -0.152440,
}

const DISTANCE_DELTA = {
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
}


function phoneCall(phoneNumber) {
    const url = `${Platform.OS === 'ios' ? 'telprompt:' : 'tel:'}${phoneNumber}`;
    Linking.openURL(url);
}

export default createComponent({displayName: 'Location'},  class LocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 51.520840,
                longitude: -0.152440,
            },
        }
    }
    clickAddress(){
        let region = this.state.region;
        this.setState({region: region});
        OpenMap({query: 'bxr', provider: 'google'});
    }

    render() {
        return (
            <ScreenContainer
                withTabBar
            >
                <MapView
                    customMarkerStyle={styles.map}
                    defaultRegion={this.state.region}
                    distanceDelta={DISTANCE_DELTA}
                    markers={markers}
                />
                <Image
                    source={background9}
                    style={styles.imageContainer}
                >
                    <VerticalLayout
                        horizontalAlign
                        style={styles.container}
                        verticalAlign
                        weight={1}
                    >
                        <VerticalLayout style={{paddingTop: 23}}>
                            <MediumText style={styles.info}>
                                <MediumText onPress={() => this.clickAddress()}>
                                BXR London{"\n"}
                                24 Paddington Street{"\n"}
                                London W1U 5QY{"\n"}
                                </MediumText>
                                {"\n"}
                                T:
                                <MediumText style={{color: '#1e88e5'}} onPress={() => phoneCall('02031463436')}>
                                    02031463436
                                </MediumText>
                                {"\n"}
                                {"\n"}
                                Opening hours:{"\n"}
                                Mon - Fri: 06:30am - 09:30pm{"\n"}
                                Sat: 08:00am - 08:00pm{"\n"}
                                Sun: 08:00am - 06:00pm{"\n"}
                            </MediumText>
                        </VerticalLayout>
                    </VerticalLayout>
                </Image>
            </ScreenContainer>
        );
    }
})
