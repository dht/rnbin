import firebase from 'firebase';
import {mainApp, getRef, listen} from '../constants/firebase';

let permissionsRef,
    permissionRef,
    usersRef,
    userRef;

const configureFirebase = () => {
    permissionsRef = mainApp.database().ref("permissions");
    usersRef = mainApp.database().ref("users");
}

const setUser = (userId) => {
    userRef = usersRef.child(userId);
}

const setPermissions = (snippetId, userId) => {
    permissionRef = permissionsRef.child(snippetId);
    return permissionRef.child('owner').set(userId);
}

const addToUserLibrary = (snippetId) => {
    userRef.child(snippetId).set(true);
}

const checkPermissions = (snippetId) => {
    return getRef(userRef.child(snippetId));
}

const login = () => {
    return firebase.auth().signInAnonymously()
        .then(response => {
            return response.uid;
        })
        .catch(error => {
            alert('problem: ' + error.message);
        });
}

const logout = () => {
    return firebase.auth().signOut();
}

configureFirebase();

export default {
    login,
    setUser,
    setPermissions,
    addToUserLibrary,
    checkPermissions,
    logout,
}