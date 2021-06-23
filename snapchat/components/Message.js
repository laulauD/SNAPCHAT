import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Message = props => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding:15}}>
          <MaterialIcons name="face" size={44} color="black" />
            <Text style={{fontSize:19, margin:9}}>{props.message.username}</Text>
        </View>
    );
};
export default Message;