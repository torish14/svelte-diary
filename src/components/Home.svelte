<script>
// ライフサイクルについてのドキュメント：https://tech-wiki.online/jp/svelte-lifecycle-events.html
import { onMount, onDestroy } from 'svelte'
import { Button } from 'smelte'
import { userId } from '../store'
import { fetch } from '../helpers/api'

let uid
const unsubscribe = userId.subscribe(id => uid = id)
let promise = fetch()
onMount(async () => {
  promise = await fetch(uid)
  console.log(promise)
})
onDestroy(() => { unsubscribe })
</script>

{#await promise}
  <p>Loading...</p>
{:then diaries}
  <p>Loaded!</p>
{/await}
<h1>Home</h1>
<Button color="accent">テスト</Button>
