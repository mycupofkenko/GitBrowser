import {StyleSheet} from 'react-native';

import {
    color,
    radius, 
    padding,
    font
} from 'globals/values';

const styles = StyleSheet.create({
    container: {
        borderRadius: radius.LARGE,
        padding: padding.SMALL,
        backgroundColor: color.SECONDARY_LIGHT,
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    text: {
        fontSize: font.LARGE,
        color: color.TEXT_ON_SECONDARY
    }
});

export default styles;