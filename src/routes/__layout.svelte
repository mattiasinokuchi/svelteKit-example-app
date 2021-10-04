<script>
	import "../app.css";
	import { page } from '$app/stores';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<nav>
	<a class:active={$page.path === '/product'} sveltekit:prefetch href="/product">PRODUCTS</a>
	<a class:active={$page.path === '/customer'} sveltekit:prefetch href="/customer">CUSTOMERS</a>
	<a class:active={$page.path === '/schedule'} sveltekit:prefetch href="/schedule">SCHEDULE</a>
	<a class:active={$page.path === '/order'} sveltekit:prefetch href="/order">ORDERS</a>
	<a class:active={$page.path === '/delivery'} sveltekit:prefetch href="/delivery">DELIVERIES</a>
</nav>

<slot></slot>

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
	a.active {
		text-decoration: none;
		color: salmon;
		margin-right: 1rem;
	}
</style>
