<script>
import { onMount } from 'svelte'
import { Slider, TextField, Button, ProgressCircular } from 'smelte'
import { getDiary, updateDiary } from '../helpers/api'
import dayjs from 'dayjs'
export let id
console.log(id)

let promise = getDiary()
let rate, body, image, preview
onMount(async () => {
  promise = await getDiary(id)
  rate = promise.rate
  body = promise.body
  console.log(promise)
})
const submit = async () => {
  console.log(promise)
  await updateDiary(id, rate, body)
  /* const returnValue = await updateDiary(id, rate, body) */
  /* if (returnValue) { */
  /* alert('日記の更新が完了しました') */
  /* } else { */
  /* alert('更新ができませんでした') */
  /* document.location.href = '/' */
  /* } */
}
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

{#await promise}
  <p class="mt-10 flex justify-center"><ProgressCircular /></p>
{:then}
  <h1 class="h4">
    {dayjs(promise.createdAt).format('YYYY年MM月DD日')}の日記
  </h1>
  <form class="p-5" on:submit|preventDefault={submit}>
    {#if !preview}
      <img
        src={promise.image ? promise.image : '/dummy.jpeg'}
        alt="diary"
        class="mb-4"
      />
    {:else}
      <img
        src={preview}
        alt="diary"
        class="mb-4"
      />
    {/if}
    <label for="file-input" class="bg-primary-900 text-white-900 px-4 py-3 mb-6 rounded m-auto  block w-4/12">画像を選択</label>
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
    <p class="mb-4">気分は{rate}点です</p>
    <Slider class="mb-4" min="1" max="10" bind:value={rate} />
    <TextField
      label="日記の本文（変更する場合は編集）"
      class="bg-white-900"
      bind:value={body}
      textarea
      rows="5"
      outlined
    />
    <Button type="submit" class="text-white-900">日記を更新</Button>
  </form>
{/await}
