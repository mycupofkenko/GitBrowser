import {StyleSheet} from 'react-native';

import {
	color,
	margin,
	padding,
	radius,
	font
} from 'globals/values';

const styles = StyleSheet.create({
	container: {
		zIndex: 0,
		flexDirection: 'column',
		flex: 1,
	},
	topContainer: {
		justifyContent: 'center', 
		flexDirection: 'row', 
		backgroundColor: color.SECONDARY,
		zIndex: 2
	},
	avatar: {
		width: 120, 
		height: 120, 
		borderRadius: 60, 
		margin: margin.LARGE
	},
	bottomContainer: {
		flex: 1, 
		backgroundColor: color.HIDDEN_BACKGROUND
	},
	bottomContent: {
		flex: 1, 
		backgroundColor: color.PRIMARY_LIGHT, 
		flexDirection: 'column', 
		justifyContent: 'center',
	},
	button: {
		alignSelf: 'center',
		backgroundColor: color.SECONDARY,
		paddingHorizontal: padding.LARGE,
		paddingVertical: padding.SMALL,
		borderRadius: radius.LARGE
	},
	buttonText: {
		fontSize: font.MEDIUM,
		color: color.TEXT_ON_DARK
	}
});

export default styles;