<script>
// ライフサイクルについてのドキュメント：https://tech-wiki.online/jp/svelte-lifecycle-events.html
import dayjs from 'dayjs'
import { Button,ProgressCircular,TextField } from 'smelte'
import { onDestroy,onMount } from 'svelte'
import { Link,Router } from 'svelte-routing'
import StarRating from 'svelte-star-rating'
import { fetch } from '../helpers/api'
import { signInWithGoogle } from '../helpers/firebase'
import { userId } from '../store'

let uid, filterMonth
const unsubscribe = userId.subscribe((id) => (uid = id))
let promise = fetch()
onMount(async () => {
  promise = await fetch(uid)
  console.log(promise)
})
onDestroy(() => {
  unsubscribe
})

const filterHandle = async () => {
  console.log(filterMonth)
  promise = await fetch(uid, filterMonth)
}
</script>

{#if !uid}
  <Button on:click={signInWithGoogle} class="text-white-900 mt-10">
    ログイン
  </Button>
{:else}
  <section>
    <h5>日記を書いた月で検索</h5>
    <TextField
      type="month"
      bind:value={filterMonth}
      on:change={filterHandle}
    />
  </section>
  {#await promise}
    <p class="mt-10 flex justify-center"><ProgressCircular /></p>
  {:then diaries}
    <Router>
      {#each diaries as d}
        <Link to={'/diary/' + d.id} class="flex items-center mb-6">
          <aside class="diary-aside">
            <p class="text-left">
              {dayjs(d.createdAt).format('YYYY年MM月DD日')}
            </p>
            <img
              src={d.image ? d.image : '/dummy.jpeg'}
              class="diary-image"
              alt="diary"
            />
            <p><StarRating rating={d.rate / 2} /></p>
            <p>{d.body}</p>
          </aside>
        </Link>
      {/each}
    </Router>
  {/await}
{/if}

<style>
.diary-aside {
  width: 40%;
  margin-right: 1rem;
}

.diary-image {
  width: 100%;
}
</style>
