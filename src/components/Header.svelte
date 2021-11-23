<script>
import { Router, Link, Route } from 'svelte-routing'
</script>


<header>
	<Router>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="create">Create</Link>
  </Router>
</header>
