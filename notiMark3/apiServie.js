import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const signUpUser = (email, password) => {
  return new Promise(function (resolve, reject) {
    auth().createUserWithEmailAndPassword(email, password)
    .then(snapshot => {
      resolve('Sign up Successfull')
    })
    .catch(error => {
      reject('Somthing went wrong', error)
    })
  })
}

export const signInUser = (email, password) => {
  return new Promise(function (resolve, reject) {
    auth().signInWithEmailAndPassword(email, password)
      .then(snapshot => {
        resolve('Sign In Successfull')
      })
      .catch(error => {
        reject('Somthing went wrong', error)
      })
  })
}

export const signOutUser = () => {
  return new Promise(function (resolve, reject) {
    auth().signOut()
      .then(snapshot => {
        resolve('Sign Out Successfull')
      })
      .catch(error => {
        reject('Somthing went wrong', error)
      })
  })
}

export const submitUser = (id, name, position) => {
  return new Promise(function(resolve, reject) {
    let key;
    if (id!=null) {
      key = id;
      console.log('key1', key)
    } else {
      key = database().ref().push().key;
      console.log('key2', key)
    }
    let userData = {
      Id: key,
      Name: name,
      Position: position,
    };
    database().ref(`users/${key}`)
    .update(userData)
    .then(snapshot => {
      resolve(snapshot);
    }).catch(err => reject('Somthing went wrong', err))
  })
}