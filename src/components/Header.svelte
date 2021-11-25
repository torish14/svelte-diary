<script>
import { Router, Link } from 'svelte-routing'
import Hamburger from 'svelte-hamburgers'
import BrightnessContrast32 from 'carbon-icons-svelte/lib/BrightnessContrast32/BrightnessContrast32.svelte'

let open
</script>

<svelte:head>
  <!-- Import base css -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css"
  />
  <!-- Import spin css (spin is default type) -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/types/spin.css"
  />
</svelte:head>

<header class="bg-primary-900 flex justify-between items-center">
  <Hamburger bind:open --color="white" />
  <!-- <Router>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="create">Create</Link>
  </Router> -->
  <BrightnessContrast32 class="mr-6 text-white-900" />
</header>

<style>
header {
  height: 60px;
}
</style>
