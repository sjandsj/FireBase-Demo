import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

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