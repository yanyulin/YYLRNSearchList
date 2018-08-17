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
    SectionList,
} from 'react-native'

// import SearchList, { HighlightableText, Touchable } from 'react-native-yyl-searchlist'
import { SearchList } from './src'


export default class example extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
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
                <SectionList
                    style={{  }}
                    sections={[
                        {title: 'D', data: ['Devin']},
                        {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
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
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

AppRegistry.registerComponent('example', () => example)
