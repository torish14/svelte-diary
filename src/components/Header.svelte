<script>
import { Router, Link } from 'svelte-routing'
</script>

<header class="bg-primary-900">
  <Router>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="create">Create</Link>
  </Router>
</header>

<style>
header {
  height: 60px;
}
</style>
