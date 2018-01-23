import { StyleSheet } from 'react-native';

import {
	font,
	margin
} from 'globals/values';

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	pie: {
		flex: 1,
		marginTop: 0,
		margin: margin.LARGE
	},
	keys: {
		flex: 1,
		margin: margin.SMALL,
		marginLeft: 0
	},
	keyItem: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	keyText: {
		margin: margin.SMALL / 2,
		fontSize: font.SMALL,
		fontWeight: 'bold'
	}
});

export default styles;