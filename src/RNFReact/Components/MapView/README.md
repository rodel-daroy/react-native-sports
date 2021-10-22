MapView
===

A component to show a map, using Apple Maps on iOS and Google Maps on web. Takes custom icons and a default region. Props differ slightly between versions.

Example
---
```

const renderCustomerMarkerDetails = (item) => (
    <VerticalLayout style={styles.callOutContainer}>
            {// any content here}
    </VerticalLayout>
);

const markers = [
    {
        latitude: 52,
        longitude: -3,
        title: 'Marker 1',
        image: TestIcon,
    },
    {
        latitude: 52.5,
        longitude: -3.5,
        title: 'Marker 2',
    }
];

<MapView
    customMarkerStyle={customMarkerStyle}
    markers={markers}
    onMarkerDetailPress={(item) => alert(`Marker Details is Pressed ${item.title}`)}
    onMarkerPress={(item) => alert(`this will change the value of open marker details for mobile ${item.title}`)}
    renderCustomerMarkerDetails={renderCustomerMarkerDetails}
    style={styles}/>
);
```

Properties
---

#### Shared
| Property | Type | Default | Effect |
| --- | --- | --- | --- |
| customMarkerStyle | StyleSheet | N/A | provides style for the marker |
| defaultRegion | Object | {latitude: 52, longitude: -3} | The centre of the map. If unspecified, will centre around United Kingdom. |
| markers | Array<Object> | [] | Markers to show on the map. Objects should include `latitude` and `longitude` props, and can include `title` that shows on hover/click or `image` that will use a custom icon. |
| onMarkerDetailPress | Function| N/A | triggered when the tooltip marker details is clicked. |
| onMarkerPress | Function | N/A | for mobile it is used to update the visibility of the marker details when marker is clicked, for native it is an additional callback when you press the markers |
| renderMarkerDetails | Function | N/A | it is a function passed to render the custom marker Details |
| onMapPress | Function | N/A | A function invoked on clicking/pressing the map.


#### Web Only
| Property | Type | Default | Effect |
| --- | --- | --- | --- |
| defaultZoom | Number | 7 | The zoom level of the map. Shows whole of UK on default level. |

#### iOS Only
| Property | Type | Default | Effect |
| --- | --- | --- | --- |
| distanceDelta | Object | {latitudeDelta: 2, longitudeDelta: 2} | The zoom level of the map. Shows whole of UK on default level. |
