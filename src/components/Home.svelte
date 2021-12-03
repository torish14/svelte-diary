<script>
// ライフサイクルについてのドキュメント：https://tech-wiki.online/jp/svelte-lifecycle-events.html
import { onMount, onDestroy } from 'svelte'
import { Router, Link } from 'svelte-routing'
import { Button } from 'smelte'
import { userId } from '../store'
import { fetch } from '../helpers/api'
import StarRating from 'svelte-star-rating'

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
  <Router>
    {#each diaries as d}
      <Link to={'/diary/' + d.id} class="flex item-center">
        <aside>
          <p>{d.createdAt}</p>
          image
          <p><StarRating rating={d.rate / 2} /></p>
          <p>{d.body}</p>
        </aside>
      </Link>
    {/each}
  </Router>
{/await}

<style>
.diary-aside {
  width: 40%;
  margin-right: 1rem;
}

.diary-image {
  width: 100%;
}
</style>
