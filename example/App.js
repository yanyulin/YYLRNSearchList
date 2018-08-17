/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native'

// import SearchList, { HighlightableText, Touchable } from 'react-native-yyl-searchlist'
import { SearchList } from './src'

let originSources = [
    { key: 'Devin' },
    { key: 'Jackson' },
    { key: 'James' },
    { key: 'Joel' },
    { key: 'John' },
    { key: 'Jillian' },
    { key: 'Jimmy' },
    { key: 'Julie' },
]
export default class example extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataSources: originSources
        }
    }

    componentDidMount() {

    }

    _onSearch(str) {
        var res = originSources.filter(function (item) {
            return item.key.indexOf(str) >= 0;
        });
        this.setState({
            dataSources: res || originSources
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SearchList
                    renderBackButton={() => null}
                    title='搜索Demo'
                    cancelTitle='取消'
                    onClickBack={() => { }}
                    renderListView={this._renderListView.bind(this)}

                    onSearch={(str) => {
                        console.log("你输入的搜索内容:" + str)

                        this._onSearch(str)
                    }}
                    onSearchEnd={() => {
                        console.log("取消了搜索")
                    }}
                    onSearchStart={() => {
                        console.log("搜索框获取焦点开始搜索")
                    }}
                />
            </View>
        )
    }

    _renderListView = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
                <FlatList
                    data={ this.state.dataSources }
                    renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })

AppRegistry.registerComponent('example', () => example)
