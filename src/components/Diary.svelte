<script>
import { onMount } from 'svelte'
import { getDiary } from '../helpers/api'
export let id
console.log(id)

let diary
onMount(async () => {
  diary = await getDiary(id)
  console.log(diary)
})
</script>
