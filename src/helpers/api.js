import {
  // eslint-disable-next-line
  collection,
  // eslint-disable-next-line
  doc,
  // eslint-disable-next-line
  getDoc,
  // eslint-disable-next-line
  addDoc,
  // eslint-disable-next-line
  query,
  // eslint-disable-next-line
  where,
  // eslint-disable-next-line
  getDocs,
  // eslint-disable-next-line
  orderBy,
} from 'firebase/firestore'
import { db } from './firebase'
import dayjs from 'dayjs'

export const fetch = async (uid = '') => {
  const q = query(
    collection(db, 'diaries'),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc'),
  )

  const querySnapshot = await getDocs(q)
  let diaries = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
    diaries.push({
      id: doc.id,
      rate: doc.data().rate,
      body: doc.data().body,
      image: doc.data().image,
      createdAt: doc.data().createdAt,
    })
  })
  return diaries
}

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

export const getDiary = async (id = '') => {
  const docRef = doc(db, 'diaries', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    return docSnap.data()
  } else {
    console.log('No such document!')
    return false
  }
}
