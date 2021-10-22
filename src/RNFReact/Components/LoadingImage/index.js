/* @flow */

import createComponent from '../../createComponent'
import defaultTo from '../../Utils/defaultTo'
import {Image} from 'react-native'
import ThemeConstants from '../../ThemeConstants'
import View from '../View'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import DefaultTheme from '../../defaultTheme';

const propTypes = {
    children: PropTypes.object,
    imageLoadedDefault: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    noImagePlaceHolder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    resizeMode: PropTypes.string,
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
}

// eslint-disable-next-line react/require-optimization
class LoadingImage extends Component {
    static propTypes = propTypes

    constructor() {
        super()
        this.state = {failed: false}
        this.onLoadFailed = this.onLoadFailed.bind(this)
    }

    onLoadFailed() {
        this.setState({failed: true})
    }

    render() {
        const {
            children,
            noImagePlaceHolder,
            imageLoadedDefault,
            source,
            style = {},
            resizeMode,
        } = this.props

        const {theme} = this.context

        const imageSource = typeof source === 'string' ? {uri: source} : source
        const image = this.state.failed ?
            defaultTo(noImagePlaceHolder, DefaultTheme[ThemeConstants.IMAGE_LOADER_NO_IMAGE_DEFAULT]) :
            imageSource

        return (
            <Image
                defaultSource={defaultTo(imageLoadedDefault, DefaultTheme[ThemeConstants.IMAGE_LOADING_DEFAULT])}
                onError={this.onLoadFailed} // eslint-disable-line react/jsx-handler-names
                resizeMode={resizeMode}
                source={image}
                style={{
                    width: defaultTo(style.width, DefaultTheme[ThemeConstants.IMAGE_LOADER_WIDTH]),
                    height: defaultTo(style.height, DefaultTheme[ThemeConstants.IMAGE_LOADER_HEIGHT]),
                    ...style}}
            >
                {children}
            </Image>
        )
    }
}

export default createComponent({displayName: 'LoadingImage', injectTheme: true}, LoadingImage)
