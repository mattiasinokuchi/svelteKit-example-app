<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/api/products");

		if (res.ok) return { props: { products: await res.json() } };
		return {
			status: res.status,
			error: new Error(),
		};
	}
</script>

<script>
	export let products;
</script>

<main>
	{#each products as { name, emoji }}
		<a sveltekit:prefetch href={`/products/${name}`} class="box">
		<h2>{name} {emoji}</h2>
		</a>
	{/each}
</main>

<style>
	main {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
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
</style>
