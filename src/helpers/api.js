// eslint-disable-next-line
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebase'
import dayjs from 'dayjs'

// Add a new document with a generated id.
export const postDiary = (uid = '', rate = 1, body = '') => {
  async function setFirestore() {
    const docRef = await addDoc(collection(db, 'diaries'), {
      uid: uid,
      rate: rate,
      body: body,
      image: '',
      createdAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    })
    console.log('Document written with ID: ', docRef.id)
    // もしデータの追加に成功したら、true を、失敗なら false を返す
    // return docRef.id ? true : false
  }
  setFirestore()
}
