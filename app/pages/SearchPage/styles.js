import {StyleSheet} from 'react-native';

import {
	color,
	padding,
	margin,
	font,
	radius,
	height
} from 'globals/values';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		zIndex: 1,
		backgroundColor: color.PRIMARY,
	},
	searchInput: {
		flex: 1,
		height: height.ROW_ITEM,
		paddingLeft: padding.SMALL,
		paddingRight: padding.SMALL,
		marginVertical: margin.SMALL,
		marginHorizontal: margin.LARGE,
		fontSize: font.MEDIUM,
		backgroundColor: color.PRIMARY_LIGHT,
		borderRadius: radius.LARGE,
		borderWidth: 1,
		borderColor: color.SECONDARY,
		color: color.SECONDARY
	},
	results: {
		flex: 1,
		backgroundColor: color.HIDDEN_BACKGROUND,
	}
});

export default styles;