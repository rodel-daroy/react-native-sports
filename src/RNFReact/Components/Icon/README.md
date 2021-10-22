Icon
=========

A generic component to display an icon from FontAwesome.

Example
---
```
<Icon
  color='#900'
  iconSet='Ionicons'
  name='ios-mail-outline'
  size={30}/>
```

Properties
---
| Property | Type | Default | Effect |
| -------- | --- | --- | --- |
| color | String | 'black' | Main color of the icon on the screen. |
| iconSet | String | N/A | Name of the icon set to use. If unspecified, defaults to FontAwesome icons. |
| name | String | N/A | Name of the icon from FontAwesome. |
| size | Integer | 24 | Size of the icon shown on the screen. |

Extra Details
---
If used on mobile, the following iconSet values are supported:
`EvilIcons`, `Ionicons`, `MaterialIcons`, `Octicons`. If not specified, will use FontAwesome icons.

If used on the web, the following iconSet values are supported:
`Ionicons`. If not specified, will use FontAwesome icons.

The names of icons can be found at these links:

| Icon Set | URL | Notes |
| --- | --- | --- |
| Evil Icons | http://evil-icons.io/ | `ei-` prefix not required for icon name. |
| Font Awesome | http://fontawesome.io/icons/ | |
| Ionicons | http://ionicframework.com/docs/v2/ionicons/ | |
| Material Icons | https://design.google.com/icons/ | If icon name has a space, use a - in place of it. |
| Octicons | https://octicons.github.com/ | `.oction-` prefix not required for icon name. |
