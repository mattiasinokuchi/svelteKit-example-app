<script>
	import "../app.css";
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<nav>
	<a sveltekit:prefetch href=".">HOME</a>
	<a sveltekit:prefetch href="/about">ABOUT</a>
	<a sveltekit:prefetch href="/customers">CUSTOMERS</a>
	<a sveltekit:prefetch href="/subscriptions">SUBSCRIPTIONS</a>
	<a sveltekit:prefetch href="/customers_subscriptions">DELIVERIES</a>
	<a sveltekit:prefetch href="/deliveries">INVOICING</a>
</nav>

<slot />

<style>
	nav {
		padding: 1rem;
		box-shadow: -1px 1px 11px 4px #898989;
	}
	a {
		text-decoration: none;
		color: gray;
		margin-right: 1rem;
	}
</style>
