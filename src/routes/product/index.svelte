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

{#if false}<slot />{/if}
<main>
	<!-- This is a form for adding new products -->
	<form class="box" action="/product.json" method="post">
		<h2>New product</h2>
		<label for="name">Name</label>
		<input
			type="text"
			id="name"
			name="name"
			aria-label="Add product"
			placeholder="Product name"
		/>
		<br />
		<label for="price">Price ($)</label>
		<input
			type="number"
			id="price"
			name="price"
			aria-label="Add product"
			placeholder="10"
		/>
		<br />
		<label for="emoji">Emoji</label>
		<input
			type="text"
			id="emoji"
			name="emoji"
			aria-label="Add product"
			placeholder="🌽"
		/>
		<br />
		<button type="submit">Submit</button>
	</form>

	<!-- This a list of all products -->
	{#each product as { name, emoji, id }}
		<a class="box" sveltekit:prefetch href={`/product/${id}`}>
			<h2>{name}</h2>
			<h2>{emoji}</h2>
		</a>
		<br />
	{/each}
</main>

<style>
	main {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
	}
	.box {
		padding: 1vw;
		margin-top: 4vw;
		box-shadow: 1vw 1vw 2vw 0.2vw lightgray;
		width: 90vw;
	}
	.box:hover {
		box-shadow: 1vw 1vw 2vw 1vw lightgray;
	}
	h2 {
		color: salmon;
	}
	a {
		text-decoration: none;
		color: salmon;
	}
	input {
		margin: 1vw;
	}
</style>
