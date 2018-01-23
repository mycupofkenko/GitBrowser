import {StyleSheet} from 'react-native';

import {color} from 'globals/values';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    footerContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    list: {
        flexGrow: 1
    },
    footer: {
        flexShrink: 1,
        flexDirection: 'row',
    },
    icon: {
        width: 24,
        height: 24,
        margin: 8,
        tintColor: color.SECONDARY
    },
    text: {
        fontSize: 16,
        margin: 12,
        color: color.SECONDARY
    }
});

export default styles;