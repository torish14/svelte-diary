<script>
import "smelte/src/tailwind.css"
import { Router, Link, Route } from 'svelte-routing'
import Header from './components/Header.svelte'
import Footer from './components/Footer.svelte'
import Home from './components/Home.svelte'
import Create from './components/Create.svelte'
import Diary from './components/Diary.svelte'
import About from './components/About.svelte'

export let url
</script>

<main class="bg-background-500">
	<Header />

	<Router url="{url}">
		<Route path="home" component="{Home}" />
		<Route path="diary/:id" component="{Diary}" />
		<Route path="create" component="{Create}" />
		<Route path="about" component="{About}" />
	</Router>

  <Footer />
</main>

<style>
</style>
