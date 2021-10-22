/* @flow */

import backgroundImage from '../images/classDetail.jpg'
import colorConstants from '../colorConstants'
import MediumText from '../common/text/LargeText'
import SmallText from '../common/text/SmallText'
import {
    createComponent,
    Image,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    backgroundImage: {
        width: null,
        position: 'relative',
        height: null,
    },
    titleRow: {
        backgroundColor: colorConstants.BXR_IMAGE_OVERLAY,
        paddingVertical: 30,
        minHeight: 80,
    },
    mainTitle: {
        backgroundColor: 'transparent',
        color: colorConstants.BXR_TEXT,
        fontSize: 20,
        fontWeight: '500',
        margin: 0,
        textAlign: 'center',
    },
    subTitle: {
        backgroundColor: 'transparent',
        color: colorConstants.BXR_TEXT,
        fontSize: 14,
        margin: 0,
        textAlign: 'center',
    },
})

const propTypes = {
    title: PropTypes.string.isRequired,
}

const getTitles = (title) => {
    const titles = (/^(.+)(\(.+\))$/g).exec(title)

    const mainTitle = titles && titles[1] ? titles[1].trim().toUpperCase() : title.trim().toUpperCase()
    const subTitle = titles && titles[2] ? titles[2].trim().toUpperCase() : null

    return {mainTitle, subTitle}
}

export default createComponent({displayName: 'DetailTitleRow', propTypes}, ({
    title,
}) => {
    const {mainTitle, subTitle} = getTitles(title)

    return (
        <VerticalLayout verticalAlign>
            <Image
                source={backgroundImage}
                style={styles.backgroundImage}
            >
                <VerticalLayout style={styles.titleRow}>
                    <MediumText style={styles.mainTitle}>
                        {mainTitle}
                    </MediumText>
                    {subTitle ?
                        <SmallText style={styles.subTitle}>
                            {subTitle}
                        </SmallText> :
                        null
                    }
                </VerticalLayout>
            </Image>
        </VerticalLayout>
    )
})
