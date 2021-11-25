<script>
import 'smelte/src/tailwind.css'
import { Route, Router } from 'svelte-routing'
import About from './components/About.svelte'
import Create from './components/Create.svelte'
import Diary from './components/Diary.svelte'
import Footer from './components/Footer.svelte'
import Header from './components/Header.svelte'
import Home from './components/Home.svelte'

export let url
</script>

<main class="bg-background-500">
  <Header />

  <section class="content">
    <Router url={url}>
      <Route path="/" component={Home} />
      <Route path="diary/:id" component={Diary} />
      <Route path="create" component={Create} />
      <Route path="about" component={About} />
    </Router>
  </section>

  <Footer />
</main>

<style>
main {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
}

.content {
  min-height: calc(100vh - 60px - 60px);
}
</style>
