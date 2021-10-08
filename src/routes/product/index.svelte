<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/product.json");
		if (res.ok) {
			const product = await res.json();
			return {
				props: { product },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let product;
</script>
{#if false}<slot></slot>{/if}
<main>
	<ul>
		{#each product as { name, emoji, id }}
			<li class="box">
				<a sveltekit:prefetch href={`/product/${id}`}>
					<h2>{name}</h2>
					<h2>{emoji}</h2>
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
	}
	.box {
		padding: 0.25rem;
		margin: 1.5rem;
		box-shadow: 4px 5px 11px 2px lightgray;
		width: 40vw;
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	ul {
		list-style-type: none;
		text-align: center;
	}
	h2 {
		color: salmon;
	}
	a {
		text-decoration: none;
		color: salmon;
	}
</style>
