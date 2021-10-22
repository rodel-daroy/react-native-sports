import {createComponent, HorizontalLayout, StyleSheet, TextInput} from "../RNFReact";

import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        height: 50,
        marginHorizontal: -7,
        paddingHorizontal: 20,
        fontSize: 17,
        color: 'white',
        backgroundColor: 'black'
    },
})

const propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
};

export default createComponent({displayName: 'InputField', propTypes}, ({
                                                                            onValueChange,
                                                                            ...props
                                                                        }) => (
    <HorizontalLayout style={styles.container}>
        <TextInput
            {...props}
            style={styles.textInput}
            placeholderTextColor={'#888888'}
            onChangeText={(text) => onValueChange(text)}
        />
    </HorizontalLayout>
));
