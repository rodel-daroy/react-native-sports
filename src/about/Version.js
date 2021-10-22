/* @flow */

import React from 'react'
import SlideContent from '../swipeIntro/SlideContent'
import {
    createComponent,
    StyleSheet,
    View,
    Text,
    Touchable,
    Linking,
} from '../RNFReact'
import MediumText from '../common/text/MediumText'

const styles = StyleSheet.create({
    slideContent: {
        flex: 1,
    },
    tab: {
        marginTop: -100,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 80,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'white',
    },
    titleText1: {
        fontSize: 25,
        marginBottom: 20,
        // fontWeight: 'bold',
        textAlign: 'center'
    },
    titleText2: {
        fontSize: 23,
        // fontWeight: 'bold',
    },
});


export default createComponent({
    displayName: 'Version',
}, ({popScene, isTab}) => (
    <View style={styles.slideContent}>
        <SlideContent
            backgroundIndex={18}
        >
            <View style={styles.textContainer}>
                <MediumText style={styles.titleText1}>
                    Version: 3.0
                </MediumText>
                <MediumText style={styles.titleText2}>
                    Developed by{'\n'}
                    <Text
                        onPress={() => Linking.openURL('http://www.swiftstudio.co/')}
                        style={{color: 'rgb(91,155,213)'}}
                    > Swift Studio
                    </Text>
                </MediumText>
            </View>
        </SlideContent>
    </View>
))
