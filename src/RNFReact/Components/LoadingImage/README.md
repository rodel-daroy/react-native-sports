Image
=========

A generic component to display an image that will display a fallback image when image passed is unreachable

Example
---˜˜
```
<Image
    source={{uri: url}}
    loadFailed={loadFailed}
    noImagePlaceHolder={noImagePlaceHolder}/>
```

Properties
---
| Property | Type | Default | Effect |
| -------- | --- | --- | --- |
| source | object | N/A | object for image {uri: ''}|
| noImagePlaceHolder | object| N/A | object for image {uri: ''} |
| loaderColor | string| N/A | color of the loader |
| loaderSize | number | N/A | size of the loader |
| style | object| n/A|  style for the image component|

###IOS ONLY
---
| Property | Type | Default | Effect |
| -------- | --- | --- | --- |
| loaderUnfilledColor | string | N/A | color of the rest of loader aside from the main|
