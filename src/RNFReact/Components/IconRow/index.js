/* @flow */

import createComponent from '../../createComponent'
import HorizontalLayout from '../HorizontalLayout'
import Icon from '../Icon'
import Row from '../Row'
import VerticalLayout from '../VerticalLayout'
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    iconLeft: PropTypes.bool,
    isIconVisible: PropTypes.bool,
    ...Row.propTypes,
}

export default createComponent({displayName: 'IconRow', propTypes}, ({ // eslint-disable-line complexity
    children,
    isIconVisible = true,
    iconName,
    iconColor,
    iconSize,
    iconSet,
    iconAfterContent = true,
    ...props
}) => {
    const icon = isIconVisible ? (
        <VerticalLayout
            horizontalAlign
            weight={1}
        >
            <Icon
                color={iconColor}
                iconSet={iconSet}
                name={iconName}
                size={iconSize}
            />
        </VerticalLayout>
    ) : null

    const content = (
        <VerticalLayout
            weight={10}
        >
            {children}
        </VerticalLayout>
    )

    return (
        <Row {...props}>
            <HorizontalLayout
                verticalAlign
            >
                {iconAfterContent ? null : icon}
                {content}
                {iconAfterContent ? icon : null}
            </HorizontalLayout>
        </Row>
    )
})
