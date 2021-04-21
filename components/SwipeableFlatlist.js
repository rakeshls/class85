import React,{Component} from 'react'
import {View, Text, Dimensions,StyleSheet } from 'react-native'
import {ListItem, Icon} from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view' 
import db from '../config'
export default class SwipeableFlatlist extends Component{
    constructor(props){
      super(props)
      this.state={
          allNotifications=this.props.allNotifications
      }
    }
    updateMarkAsRead=notification=>{
        db.collection('all_notifications')
        .doc(notification.doc_id)
        .update({
            notification_status:'read'
        })
    }
    onSwipeValueChange=SwipeData=>{
        var allNotifications=this.state.allNotifications
        const {Key,value}=SwipeData
        if(value<-Dimensions.get('window').width){
            const newData = [...allNotifications]
            this.updateMarkAsRead(allNotifications[Key])
            newData.splice(Key,1)
            this.setState({
             allNotifications:newData
            })
        }
    }
    renderItem=data=>{
        <ListItem
        leftElement={<Icon name='book' type='font-awesome' color='green'/>}
        title={data.item.book_name}
        titleStyle={{color:'black',fontWeight:'bold'}}
        subtitle={data.item.message}
        bottomDivider
        />
    }
    renderHiddenItem=()=>{
        <View style={styles.rowBack}>
            <View style={[styles.backRightButton1,styles.backRightButton2]}>
                <Text>Mark As Read</Text>
            </View>
        </View>
    }
    render(){
        return(
            <View>
                <SwipeListView 
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get('window').width}
                previewRowKey={'0'}
                previewOpenValue={-40}
                onSwipeValueChange={this.onSwipeValueChange}
                keyExtractor={(item,index)=> index.toString()}>
                    
                </SwipeListView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    rowBack:{
        backgroundColor:'orange'
    },
    backRightButton1:{
        alignItems:'center',
        bottom:0,
        justifyContent:'center',
        position:'absolute',
        top:0,
        width:100
    },
    backRightButton2:{
        right:0,
        backgroundColor:'green'
    }
})