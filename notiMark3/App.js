import React, { useEffect, useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { signUpUser, signInUser, signOutUser, submitUser } from './apiServie';
import database from '@react-native-firebase/database';


const App = () => {

  const [ name, changeName ] = useState('');
  const [ position, changePosition ] = useState('');
  const [ id, setId ] = useState();
  const [list, setUsersList ] = useState([]);

  const saveAll = () => {
   console.log(name, position)
    if (position !== '' && name !== '') {
      submitUser(id, name, position).then(result => {
        setId(null);
        changeName('');
        changePosition('');
      })
      .catch(err => console.log('Error: ', err))
    }
    else {
      alert('Invalid');
    }
    
  }

  const deleteAll = () => {
    database().ref('users')
    .remove()
    .then(() => {
      setUsersList([]);
      alert('Deleted All Users');
    }).catch(err=>{
      alert('Somthing went wrong', err);
    })
    
  }

  const deleteUser = (userSelected) => {
    console.log('Remove This User', userSelected);
    database().ref(`users/${userSelected.Id}`).remove().then(()=>{
      alert(`Removed ${userSelected.Name} successfully`)
    }).catch(err => {
      console.log(`Somthing went wrong while removing ${userSelected.Name}: Error: `, err)
    })
  }

  const editUser = (userSelected) => {
    console.log('Edit User', userSelected);
    setId(userSelected.Id);
    changeName(userSelected.Name);
    changePosition(userSelected.Position);
  }

  useEffect(() => {
    userRef = database().ref('users');
    const getListListner = userRef.on('value', snapshot => {
      console.log('useEffect get list listner called', snapshot);
      setUsersList([]);
      snapshot.forEach(element => {
        console.log('element.val' , element.val())
        setUsersList(list=>[...list, element.val()])
      });
    })
    return () => {
      database().ref('users').off('value', getListListner)
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
          <TouchableOpacity onPress={deleteAll} style={styles.buttons}>
            <Text>
              Delete All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveAll} style={styles.buttons}>
            <Text>
              Save All
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={name}
          style={styles.input}
          editable
          onChangeText={changeName}
          maxLength={40}
          placeholder={'Name'}
        />
        <TextInput
          style={styles.input}
          value={position}
          editable
          onChangeText={changePosition}
          maxLength={40}
          placeholder={'Position'}
        />
        <View style={{marginTop: 10}}>
          <FlatList
            data={list}
            renderItem={(item)=>{
              console.log('item', item)
              return(
                <View style={{margin: 5,flex: 1, borderRadius: 5, flexDirection: 'row', backgroundColor: 'orange', justifyContent: 'space-between', padding: 10}}>
                  <View style={{ justifyContent: 'space-around'}}>
                    <Text>
                      {` Name :${item.item.Name}`}
                    </Text>
                    <Text>
                      {`Position :${item.item.Position}`}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={()=>deleteUser(item.item)} style={styles.buttons}>
                      <Text>
                        Delete 
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>editUser(item.item)} style={styles.buttons}>
                      <Text>
                       Edit 
                       </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
           // keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    textAlign: 'center',
    backgroundColor: 'orangered',
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
  }, 
  buttons: {
    width: 80,
    height: 30,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
  }
});

export default App;