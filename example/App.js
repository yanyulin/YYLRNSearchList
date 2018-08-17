/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react'
import {
    AppRegistry,
    StatusBar,
    StyleSheet,
    Text,
    View,
    SectionList,
} from 'react-native'

// import SearchList, { HighlightableText, Touchable } from 'react-native-yyl-searchlist'
import SearchList, { HighlightableText, Touchable } from './src'


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
                    toolbarBackgroundColor={'#2196f3'}
                    title='Search List Demo'
                    cancelTitle='取消'
                    onClickBack={() => { }}
                    searchListBackgroundColor={'#2196f3'}
                    searchBarToggleDuration={300}
                    searchInputBackgroundColor={'#0069c0'}
                    searchInputBackgroundColorActive={'#6ec6ff'}
                    searchInputPlaceholderColor={'#FFF'}
                    searchInputTextColor={'#FFF'}
                    searchInputTextColorActive={'#000'}
                    searchInputPlaceholder='Search'
                    sectionIndexTextColor={'#6ec6ff'}
                    searchBarBackgroundColor={'#2196f3'} 
                    renderListView={this._renderListView.bind(this)}
                />
            </View>
        )
    }

    _renderListView = () => {
        return (
            <View style={{ flex: 1 }}>
                <SectionList
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
