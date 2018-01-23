import {StyleSheet} from 'react-native';

import {color} from 'globals/values';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        width: 20,
        height: 20,
        margin: 12,
        tintColor: color.SECONDARY,
    },
    columnLeft: {
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'flex-start',
    },
    columnRight: {
        flexShrink: 1,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: color.SECONDARY,
        margin: 12,
    }
});

export default styles;