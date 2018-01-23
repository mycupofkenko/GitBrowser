import {StyleSheet} from 'react-native';

import {
    color,
    margin,
    radius,
    padding,
    font
} from 'globals/values';

const styles = StyleSheet.create({
    card: {
        backgroundColor: color.PRIMARY_LIGHT,
        margin: margin.LARGE,
        marginBottom: 0,
        borderRadius: radius.LARGE,
    },
    cardContainer: {
        flexDirection: 'column'
    },
    avatar: {
        width: 44,
        height: 44,
        margin: margin.LARGE,
        borderRadius: radius.LARGE
    },
    name: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: color.SECONDARY,
        padding: padding.LARGE,
        paddingBottom: 0
    },
    index: {
        flexShrink: 1,
        fontSize: font.LARGE,
        fontWeight: 'bold',
        color: color.SECONDARY,
        paddingTop: padding.LARGE,
        paddingLeft: 0,
        paddingRight: padding.LARGE,
        paddingBottom: 0
    },
    description: {
        padding: padding.LARGE,
        color: color.TEXT_ON_LIGHT
    },
    topContainer: {
        flexDirection: 'column',
        padding: padding.SMALL
    },
    topLine: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    bottomContainer: {
        flexDirection: 'row',
        padding: padding.SMALL,
        flex: 1,
        justifyContent: 'space-between',
        bottom: 0,
        backgroundColor: color.SECONDARY_LIGHT,
        //borderTopColor: color.PRIMARY_DARK,
        //borderTopWidth: 1,
        borderBottomRightRadius: radius.LARGE,
        borderBottomLeftRadius: radius.LARGE
    },
    bottomCell: {
        bottom: 0,
    },
    owner: {
        color: color.SECONDARY
    },
    bottomLabel: {
        color: color.SECONDARY_DARK,
        fontSize: font.SMALL,
        paddingBottom: padding.SMALL,
        padding: padding.LARGE
    },
    bottomText: {
        fontSize: font.MEDIUM,
        maxWidth: 160,
        padding: padding.LARGE,
        paddingTop: 0,
        color: color.TEXT_ON_LIGHT
    },
});

export default styles;