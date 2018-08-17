
import {
    View,
    StyleSheet,
    Animated,
    Image,
    TouchableOpacity
} from 'react-native'

import React, { Component } from 'react'
import SearchBar from './components/SearchBar'

import Toolbar from './components/Toolbar' 
import PropTypes from 'prop-types'
import Theme from './components/Theme'


export default class SearchList extends Component {
    static propTypes = {
        searchListBackgroundColor: PropTypes.string,
        toolbarBackgroundColor: PropTypes.string,
        searchBarToggleDuration: PropTypes.number,
        searchBarBackgroundColor: PropTypes.string,
        searchInputBackgroundColor: PropTypes.string,
        searchInputBackgroundColorActive: PropTypes.string,
        searchInputTextColor: PropTypes.string,
        searchInputTextColorActive: PropTypes.string,
        searchInputPlaceholderColor: PropTypes.string,
        searchInputPlaceholder: PropTypes.string,
        title: PropTypes.string,
        titleTextColor: PropTypes.string,
        cancelTitle: PropTypes.string,
        cancelTextColor: PropTypes.string,
        sortFunc: PropTypes.func,
        resultSortFunc: PropTypes.func,
        renderBackButton: PropTypes.func,
        onSearchStart: PropTypes.func,
        onSearchEnd: PropTypes.func,
        renderListView: PropTypes.func
    }

    static defaultProps = { 
        searchListBackgroundColor: Theme.color.primaryDark,
        toolbarBackgroundColor: Theme.color.primaryDark,
    }

    constructor(props) {
        super(props)

        this.state = {
            isSearching: false,
            animatedValue: new Animated.Value(0),
        }

        this.searchStr = ''
    }


    componentWillReceiveProps(nextProps) {
        // if (nextProps && this.props.data !== nextProps.data) {
        //   this.initList(nextProps.data)
        // }
    }

    componentDidMount() {

    } 

    search(input) {
        this.props.onSearch && this.props.onSearch(input)
    }

    enterSearchState() {
        this.setState({ isSearching: true })
        Animated.timing(this.state.animatedValue, {
            duration: this.props.searchBarToggleDuration || Theme.duration.toggleSearchBar,
            toValue: 1,
            useNativeDriver: true
        }).start(() => {
        })
    }

    exitSearchState() {
        Animated.timing(this.state.animatedValue, {
            duration: this.props.searchBarToggleDuration || Theme.duration.toggleSearchBar,
            toValue: 0,
            useNativeDriver: true
        }).start(() => {
            // this.search('')
            this.setState({ isSearching: false })
        })
    }

    onFocus() {
        if (!this.state.isSearching) {
            this.enterSearchState()
        }
        this.props.onSearchStart && this.props.onSearchStart()
    }

    onBlur() {
        this.props.onSearchEnd && this.props.onSearchEnd()
    }

    onClickCancel() {
        this.exitSearchState()
        this.props.onSearchEnd && this.props.onSearchEnd()
    }

    cancelSearch() {
        this.refs.searchBar && this.refs.searchBar.cancelSearch && this.refs.searchBar.cancelSearch()
    }

    render() {
        return (
            <Animated.View
                ref='view'
                style={[{
                    height: Theme.size.windowHeight + Theme.size.toolbarHeight,
                    width: Theme.size.windowWidth,
                    transform: [
                        {
                            translateY: this.state.animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -Theme.size.toolbarHeight]
                            })
                        }
                    ]
                }, this.props.style]}>
                <View style={[{
                    flex: 1,
                    backgroundColor: this.props.searchListBackgroundColor
                }]}>
                    <Toolbar
                        animatedValue={this.state.animatedValue}
                        style={[{
                            opacity: this.state.animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0]
                            }),
                            backgroundColor: this.props.toolbarBackgroundColor
                        }]}
                        title={this.props.title}
                        textColor={this.props.titleTextColor}
                        renderBackButton={this.props.renderBackButton || this._renderBackButton.bind(this)}
                    />

                    <SearchBar
                        placeholder={this.props.searchInputPlaceholder ? this.props.searchInputPlaceholder : ''}
                        onChange={this.search.bind(this)}
                        onFocus={this.onFocus.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                        onClickCancel={this.onClickCancel.bind(this)}
                        cancelTitle={this.props.cancelTitle}
                        cancelTextColor={this.props.cancelTextColor}
                        searchBarBackgroundColor={this.props.searchBarBackgroundColor}
                        searchInputBackgroundColor={this.props.searchInputBackgroundColor}
                        searchInputBackgroundColorActive={this.props.searchInputBackgroundColorActive}
                        searchInputPlaceholderColor={this.props.searchInputPlaceholderColor}
                        searchInputTextColor={this.props.searchInputTextColor}
                        searchInputTextColorActive={this.props.searchInputTextColorActive}
                        searchTextInputStyle={{ backgroundColor: '#E1E2E7' }}
                        ref='searchBar' />
                    <View
                        shouldRasterizeIOS
                        renderToHardwareTextureAndroid
                        style={styles.listContainer}>
                        { this.props.renderListView() }
                    </View>
                </View>
                {this._renderMask.bind(this)()}
            </Animated.View>
        )
    }

    /**
     * render the modal mask when searching
     * @returns {XML}
     * @private
     */
    _renderMask() {
        const { isSearching } = this.state
        if (isSearching && !this.searchStr) {
            return (
                <TouchableOpacity
                    onPress={this.cancelSearch.bind(this)} underlayColor='rgba(0, 0, 0, 0.0)'
                    style={[styles.maskStyle]}>
                    <Animated.View />
                </TouchableOpacity>
            )
        }
    }

    /**
     * render back button on the Toolbar
     * @returns {XML}
     * @private
     */
    _renderBackButton() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}>
                <Image
                    hitSlop={{ top: 10, left: 20, bottom: 10, right: 20 }}
                    style={[{
                        width: 20,
                        height: 20,
                        paddingLeft: 15,
                        paddingRight: 15
                    }]}
                    source={require('./images/image-left-arr.png')} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    maskStyle: {
        position: 'absolute',
        top: Theme.size.headerHeight + Theme.size.searchInputHeight,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.color.maskColor,
        zIndex: 999
    },
    listContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
})
