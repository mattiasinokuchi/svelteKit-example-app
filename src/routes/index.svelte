{#if false}<slot></slot>{/if}
<main>
	<h1 class="box"><a sveltekit:prefetch href="/customer" >CUSTOMERS</a></h1>
	<h1 class="box"><a sveltekit:prefetch href="/product" >PRODUCTS</a></h1>
	<h1 class="box"><a sveltekit:prefetch href="/order" >ORDERS</a></h1>
	<h1 class="box"><a sveltekit:prefetch href="/delivery" >DELIVERIES</a></h1>
</main>

<style>
	main {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	h1 {
		width: 60vw;
	}
	.box {
		padding: 0.25rem;
		margin: 1.5rem;
		color: salmon;
		box-shadow: 4px 5px 11px 2px lightgray;
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	a {
		text-decoration: none;
		color: salmon;
	}
</style>
