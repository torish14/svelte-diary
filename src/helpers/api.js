import dayjs from 'dayjs'
import {
  // eslint-disable-next-line
  addDoc,
  // eslint-disable-next-line
  collection,
  // eslint-disable-next-line
  doc,
  // eslint-disable-next-line
  getDoc,
  // eslint-disable-next-line
  getDocs,
  // eslint-disable-next-line
  orderBy,
  // eslint-disable-next-line
  query,
  // eslint-disable-next-line
  updateDoc,
  // eslint-disable-next-line
  where,
  // eslint-disable-next-line
  deleteDoc,
} from 'firebase/firestore'
// eslint-disable-next-line
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase'

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
export const postDiary = async (
  uid = '',
  rate = 1,
  body = '',
  image = null,
) => {
  let uploadResult = ''
  if (image) {
    const storageRef = ref(storage)
    // 拡張子を取得
    const ext = image.name.split('.').pop()
    // 画像ファイル名を固定
    const hashName = Math.random().toString(36).slice(-8)
    const uploadRef = ref(storageRef, `/images/${hashName}.${ext}`)
    await uploadBytes(uploadRef, image).then(async function (result) {
      console.log(result)
      console.log('Uploaded a blob or files!')
      // 表示用のダウンロードURLを取得
      await getDownloadURL(uploadRef).then(function (url) {
        uploadResult = url
        console.log(url)
      })
    })
  }
  const docRef = await addDoc(collection(db, 'diaries'), {
    uid: uid,
    rate: rate,
    body: body,
    image: uploadResult,
    createdAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  })
  console.log('Document written with ID: ', docRef.id)
  // もしデータの追加に成功したら、true を、失敗なら false を返す
  // return docRef.id ? true : false
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

export const updateDiary = async (
  id = '',
  rate = 1,
  body = '',
  image = null,
) => {
  let uploadResult = ''
  if (image) {
    const storageRef = ref(storage)
    // 拡張子を取得
    const ext = image.name.split('.').pop()
    // 画像ファイル名を固定
    const hashName = Math.random().toString(36).slice(-8)
    const uploadRef = ref(storageRef, `/images/${hashName}.${ext}`)
    await uploadBytes(uploadRef, image).then(async function (result) {
      console.log(result)
      console.log('Uploaded a blob or files!')
      // 表示用のダウンロードURLを取得
      await getDownloadURL(uploadRef).then(function (url) {
        uploadResult = url
        console.log(url)
      })
    })
  }
  const diaryRef = doc(db, 'diaries', id)

  if (!diaryRef) {
    return false
  }
  let updateData
  if (image.name) {
    updateData = {
      body: body,
      rate: rate,
      image: uploadResult,
    }
  } else {
    updateData = {
      body: body,
      rate: rate,
    }
  }
  await updateDoc(diaryRef, updateData)
}
