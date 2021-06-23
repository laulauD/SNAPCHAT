import React from 'react';
import { FlatList, View, TouchableOpacity , Text, StyleSheet} from 'react-native';
import Message from './Message';


const GoToChat = props => {
    props.navigate('ConversationScreen')
   };

const msg = [
    { id: 0, username: 'Alain Provist' },
    { id: 1, username: 'Barbara Dégout' },
    { id: 2, username: 'Camille Onette' },
    { id: 3, username: 'Daisy Rable' },
    { id: 4, username: 'Solen Dougt' },
    { id: 5, username: 'Laurine' },
    { id: 6, username: 'Laura ' },
    { id: 7, username: 'Morgan' },
    { id: 8, username: 'Dwight' },
    { id: 9, username: 'Pam' },
    { id: 10, username: 'Toto' }
];

const Conv = () => {
    return(
        <View>
           <View  style={style.head}>
                <Text style={style.text}>ALL MY FRIENDS</Text>
            </View>
            <FlatList style={{ height: '100%', paddingTop:2, backgroundColor: '#fff8d9'}}
                data={msg}
                keyExtractor={({ id }) => id.toString()}     
                renderItem={
                    ({ item }) => (
                        <TouchableOpacity style={{ height: 70, fontSize:19, marginTop:10}} onPress={() => {GoToChat, { username: item.username }}} > 
                            <View  style={{ backgroundColor:'rgba(180, 180, 180, 0.3)', height: '100%',  margin:4}}  >
                                <Message  message={item} />
                         </View>
                      </TouchableOpacity>
                    )
                }
            />
        </View>
    );
};


const style = StyleSheet.create({
    head: {
        backgroundColor: 'yellow',
        height: 75
    },
    text: {
        fontSize: 26,
        color: 'black',
        textAlign: 'center',
        padding: 30
    }, 
    });
export default Conv;

