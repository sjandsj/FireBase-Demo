import React, { useEffect, useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { signUpUser, signInUser, signOutUser } from './apiServie';

const App = () => {
  const [email, changeMail] = useState('');
  const [pass, changePass] = useState('');
  const [user, setUser] = useState();

  const signUp = () => {
    console.log(email, pass)
    signUpUser(email, pass).then(data=>{
      console.log('SignupUser function called', data)
    }).catch(error=>{
      console.log('error in signupuser Method', error)
    })
    // auth()
    //   .createUserWithEmailAndPassword(email, pass)
    //   .then(() => {
    //     console.log('User account created & signed in!');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }

    //     console.error(error);
    //   });
  }

  const signIn = () => {
    console.log(email, pass)
    signInUser(email, pass).then(data=>{
      console.log('SignInUser function called', data)
    }).catch((error)=>{
      console.log('error in signInuser Method', error)
    })
    // auth()
    //   .createUserWithEmailAndPassword(email, pass)
    //   .then(() => {
    //     console.log('User account created & signed in!');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }

    //     console.error(error);
    //   });
  }

  const logOut = () => {
    console.log('Logout was pressed')
    signOutUser().then(()=>{
      console.log('Sign out successfully')
    }).catch(error=>{
      console.log('somthing went wrong', error)
    })
  }

  const onAuthChanged = user => {
    setUser(user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        { user && 
        (<TouchableOpacity
          onPress={() => logOut()}
          style={{ backgroundColor: 'yellow', width: 80, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', height: 30, borderRadius: 10, marginTop: 20 }} >
          <Text>
            Log Out
          </Text>
        </TouchableOpacity>)}
        <TextInput
          value={email}
          style={styles.input}
          editable
          onChangeText={changeMail}
          maxLength={40}
          placeholder={'Enter Email'}
        />
        <TextInput
          style={styles.input}
         value = {pass}
          editable
          onChangeText={changePass}
          maxLength={40}
          placeholder={'Enter Password'}
          secureTextEntry={true}
        />
        <TouchableOpacity 
        onPress={() => signUp()}
        style={{backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 10, marginTop: 20}} >
          <Text>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 120}}>
          <TextInput
            value={email}
            style={styles.input}
            editable
            onChangeText={changeMail}
            maxLength={40}
            placeholder={'Enter Email'}
          />
          <TextInput
            style={styles.input}
            value={pass}
            editable
            onChangeText={changePass}
            maxLength={40}
            placeholder={'Enter Password'}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={() => signIn()}
            style={{ backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 10, marginTop: 20 }} >
            <Text>
              Sign In
          </Text>
          </TouchableOpacity>
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
    backgroundColor: '#307ecc',
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
  }
});

export default App;