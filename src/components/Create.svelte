<script>
import { onDestroy } from 'svelte'
import { Slider, TextField, Button } from 'smelte'
import { userId } from '../store'
let uid = null
const unsubscribe = userId.subscribe( id => uid = id)
console.log('uid : ' + uid)

let rate = 5
let body = ''

const submit = () => {
  if (body.length < 10) {
    alert('日記の内容を10文字以上書いてください')
    return false
  }
  // firestore へ POSTする関数を呼び出す
  console.log('submit')
  console.log(uid, rate, body)
}
onDestroy( () => {
  unsubscribe
})
</script>

<h3>日記を書こう！</h3>
<form class="p-5" on:submit|preventDefault={submit}>
  <p class="mb-4">今日の気分は{rate}点です</p>
  <Slider class="mb-4" min="1" max="10" bind:value={rate} />
  <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
  <Button type="submit" class="text-white-900">日記を保存</Button>
</form>
