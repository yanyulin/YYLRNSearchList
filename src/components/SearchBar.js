import {
    View,
    Text,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    Animated,
    StyleSheet
} from 'react-native'
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import Theme from './Theme'

const { cancelButtonWidth: buttonWidth, searchBarHorizontalPadding, searchIconWidth } = Theme.size

export default class SearchBar extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onClickCancel: PropTypes.func,
        cancelTitle: PropTypes.string,
        cancelTextColor: PropTypes.string,
        searchInputBackgroundColor: PropTypes.string,
        searchInputBackgroundColorActive: PropTypes.string,
        searchInputPlaceholderColor: PropTypes.string,
        searchInputTextColor: PropTypes.string,
        searchInputTextColorActive: PropTypes.string,
        searchBarBackgroundColor: PropTypes.string,
        isShowHolder: PropTypes.bool
    }

    static defaultProps = {
        searchInputBackgroundColor: '#E1E2E7',
        searchInputBackgroundColorActive: '#F5F5F5',
        searchInputPlaceholderColor: '#9D9D9D',
        searchInputTextColor: '#171a23',
        searchInputTextColorActive: '#000',
        searchBarBackgroundColor: '#F5F5F5',
        cancelTextColor: '#000',
        cancelTitle: '取消'
    }

    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            isShowHolder: true,
            animatedValue: new Animated.Value(0)
        }
    }

    //搜索文字改变的时候调用
    onChange(str) {
        this.props.onChange && this.props.onChange(str)
        this.setState({ str })
    }

    //取消搜索的时候调用
    onBlur() {
        this.props.onBlur && this.props.onBlur()
    }

    //搜索框获取焦点 开始搜索
    onFocus() {
        this.props.onFocus && this.props.onFocus()
        this.searchingAnimation(true)
    }

    searchingAnimation(isSearching) {
        let toVal = 0
        if (isSearching) {
            this.state.animatedValue.setValue(0)
            toVal = buttonWidth
        } else {
            this.state.animatedValue.setValue(buttonWidth)
            toVal = 0
        }

        Animated.timing(this.state.animatedValue, {
            duration: Theme.duration.toggleSearchBar,
            toValue: toVal
        }).start(() => {
            this.setState({ isShowHolder: !isSearching })
        })
    }

    //取消搜索
    cancelSearch() {
        this.refs.input.clear()
        this.refs.input.blur()
        this.searchingAnimation(false)
        this.props.onClickCancel && this.props.onClickCancel()
    }

    render() {
        return (
            <View
                style={[
                    this.props.style,
                    {
                        flexDirection: 'row',
                        padding: searchBarHorizontalPadding,
                        height: Theme.size.searchInputHeight,
                        backgroundColor: this.props.searchBarBackgroundColor
                    },
                    {
                        width: Theme.size.windowWidth + buttonWidth
                    }
                ]}>
                <Animated.View style={{
                    width: this.state.animatedValue.interpolate({
                        inputRange: [0, buttonWidth],
                        outputRange: [Theme.size.windowWidth - searchBarHorizontalPadding * 2, Theme.size.windowWidth - buttonWidth - searchBarHorizontalPadding]
                    }),
                    backgroundColor: this.state.animatedValue.interpolate({
                        inputRange: [0, buttonWidth],
                        outputRange: [this.props.searchInputBackgroundColor, this.props.searchInputBackgroundColorActive]
                    }),
                    height: 28,
                    borderRadius: 5
                }}>
                    <TextInput
                        onFocus={this.onFocus.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                        ref='input'
                        style={[styles.searchTextInputStyle, {
                            color: this.props.searchInputTextColorActive && !this.state.isShowHolder
                                ? this.props.searchInputTextColorActive
                                : this.props.searchInputTextColor || '#979797'
                        }, this.props.searchTextInputStyle]}
                        onChangeText={this.onChange.bind(this)}
                        value={this.state.value}
                        underlineColorAndroid='transparent'
                        returnKeyType='search' />

                    <Animated.View
                        pointerEvents='none'
                        style={[
                            styles.leftSearchIconStyle,
                            {
                                opacity: this.state.animatedValue.interpolate({
                                    inputRange: [0, buttonWidth],
                                    outputRange: [0, 1]
                                })
                            }
                        ]}>
                        <Image
                            style={styles.searchIconStyle}
                            source={require('../images/image-icon-search.png')} />
                    </Animated.View>

                    <Animated.View
                        pointerEvents='none'
                        style={[styles.centerSearchIconStyle, {
                            opacity: this.state.animatedValue.interpolate({
                                inputRange: [0, 70],
                                outputRange: [!this.state.value ? 1 : 0, 0]
                            })
                        }]}>
                        <Image
                            style={styles.searchIconStyle}
                            source={require('../images/image-icon-search.png')} />
                        <Text style={{
                            marginLeft: 5,
                            color: this.props.searchInputPlaceholderColor,
                            fontSize: 14,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}>{this.props.placeholder}</Text>
                    </Animated.View>
                </Animated.View>
                <View style={{
                    width: buttonWidth,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableWithoutFeedback onPress={this.cancelSearch.bind(this)}>
                        <View
                            style={{
                                flex: 1,
                                height: Theme.size.searchInputHeight,
                                width: buttonWidth,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5
                            }}
                            shouldRasterizeIOS
                            renderToHardwareTextureAndroid
                        >
                            <Text
                                style={{ color: this.props.cancelTextColor }}
                                numberOfLines={1}>{this.props.cancelTitle}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    searchTextInputStyle: {
        flex: 1,
        height: 28,
        padding: 0,
        paddingLeft: searchIconWidth,
        paddingRight: 8,
        borderRadius: 5
    },
    centerSearchIconStyle: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignSelf: 'stretch'
    },
    leftSearchIconStyle: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        width: searchIconWidth
    },
    searchIconStyle: {
        width: 12,
        height: 12
    }
})
