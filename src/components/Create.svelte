<script>
import { Button, Slider, TextField } from 'smelte'
import { onDestroy } from 'svelte'
import { postDiary } from '../helpers/api'
import { userId } from '../store'

let uid = null
const unsubscribe = userId.subscribe((id) => (uid = id))
console.log('uid : ' + uid)

let rate = 5
let body = ''
let image,
  preview = ''

const submit = async () => {
  if (body.length < 10) {
    alert('日記の内容を10文字以上書いてください')
    return false
  }
  // firestore へ POSTする関数を呼び出す
  console.log('submit!')
  console.log(uid, rate, body)
  postDiary(uid, rate, body, image)
  /* const result = await postDiary(uid, rate, body) */
  /* if(!result) { */
  /* alert('日記の保存が失敗しました') */
  /* } else { */
  /* alert ('日記が保存されました！') */
  /* document.location.href = '/' */
  /* } */
}
onDestroy(() => {
  unsubscribe
})

// アップロードした画像のプレビュー機能
const onFileSelect = (e) => {
  let target = e.target.files[0]
  image = target
  let reader = new FileReader()
  reader.readAsDataURL(target)
  reader.onload = (e) => {
    preview = e.target.result
  }
}
</script>

<h3>日記を書こう！</h3>
<form class="p-5" on:submit|preventDefault={submit}>
  <p class="mb-4">今日の気分は{rate}点です</p>
  <Slider class="mb-4" min="1" max="10" bind:value={rate} />
  <TextField
    label="日記の本文"
    class="bg-white-900"
    bind:value={body}
    textarea
    rows="5"
    outlined
  />
  {#if preview}
    <img src={preview} alt="preview" />
  {/if}
  <label
    for="file-input"
    class="bg-primary-900 text-white-900 px-4 py-3 mb-6 rounded m-auto  block w-4/12"
    >画像を選択</label
  >
  <input
    type="file"
    accept="image/*"
    id="file-input"
    class="hidden"
    bind:this={image}
    on:change={(e) => {
      onFileSelect(e)
    }}
  />
  <Button type="submit" class="text-white-900">日記を保存</Button>
</form>
