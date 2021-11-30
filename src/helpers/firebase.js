// Import the functions you need from the SDKs you need
// eslint-disable-next-line
import { initializeApp } from 'firebase/app'
import {
  // eslint-disable-next-line
  getAuth,
  // eslint-disable-next-line
  signInWithPopup,
  // eslint-disable-next-line
  GoogleAuthProvider,
  // eslint-disable-next-line
  signOut,
} from 'firebase/auth'
import { userId } from '../store'
import Cookies from 'js-cookie'

// Your web app's Firebase configuration
const firebaseConfig = {
  // eslint-disable-next-line
  apiKey: FIREBASE_API_KEY,
  // eslint-disable-next-line
  authDomain: FIREBASE_AUTH_DOMAIN,
  // eslint-disable-next-line
  projectId: FIREBASE_PROJECT_ID,
  // eslint-disable-next-line
  storageBucket: FIREBASE_STORAGE_BUCKET,
  // eslint-disable-next-line
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  // eslint-disable-next-line
  appId: FIREBASE_APP_ID,
}

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
const auth = getAuth()

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential =
        GoogleAuthProvider.credentialFromResult(result)
      // eslint-disable-next-line
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      userId.set(result.user.uid)
      console.log(user)
      Cookies.set('uid', result.user.uid)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // eslint-disable-next-line
      const errorCode = error.code
      // eslint-disable-next-line
      const errorMessage = error.message
      // The email of the user's account used.
      // eslint-disable-next-line
      const email = error.email
      // The AuthCredential type that was used.
      // eslint-disable-next-line
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}

export const googleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Cookie を削除
      Cookies.remove('uid')
      // 画面を更新
      document.location.reload()
    })
    .catch(() => {
      alert('ログアウトできませんでした')
    })
}
