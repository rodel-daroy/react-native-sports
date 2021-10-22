/* @flow */

import ImagePicker from 'react-native-image-picker'

type PickerOptionsParams = {
    allowsEditing?: boolean,
    maxHeight?: number,
    maxWidth?: number,
    mediaType?: string,
    quality?: number,
    title: string,
}

const PICKER_OPTIONS = {
    allowsEditing: true,
    mediaType: 'photo',
    title: 'Select Photo',
}

export default (imageHandler: Function, options?: PickerOptionsParams = PICKER_OPTIONS) => {
    ImagePicker.showImagePicker(options, (response) => {
        if (response.error || !response.data) {
            return
        }

        imageHandler(`data:image/jpeg;base64,${response.data}`)
    })
}
