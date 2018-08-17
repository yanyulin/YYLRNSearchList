import {
  Dimensions,
  Platform,
  StatusBar
} from 'react-native'

const statusBarHeight = Platform.select({
  android: StatusBar.currentHeight,
  ios: Platform.OS === 'ios' && Dimensions.get('window').height === 812 ? 44 : 20
})
export default {
  color: {
    primary: '#171a23',
    textPrimary: '#171a23',

    primaryDark: '#f5f5f5',
    primaryLight: '#171a23',
    maskColor: 'rgba(0, 0, 0, 0.1)'
  },
  size: {
    sectionHeaderHeight: 24,
    rowHeight: 40,

    toolbarHeight: 44,
    headerHeight: 44 + statusBarHeight,
    searchInputHeight: 44,

    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,

    statusBarHeight,

    searchIconWidth: 30,
    cancelButtonWidth: 70,
    searchBarHorizontalPadding: 8
  },
  duration: {
    toggleSearchBar: 300
  }
}
