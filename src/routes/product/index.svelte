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
		<ul>
			<li>
				<label for="name">Product Name</label>
			</li>
			<li>
				<input
					type="text"
					id="name"
					name="name"
					aria-label="Add product"
					placeholder="Product name"
				/>
			</li>
			<br />
			<li>
				<label for="price">Price ($)</label>
			</li>
			<li>
				<input
					type="number"
					id="price"
					name="price"
					aria-label="Add product"
					placeholder="10"
				/>
			</li>
			<br />
			<li>
				<label for="emoji">Emoji</label>
			</li>
			<li>
				<input
					type="text"
					id="emoji"
					name="emoji"
					aria-label="Add product"
					placeholder="🌽"
				/>
			</li>
			<br />
			<li class="button">
				<button type="submit">Submit</button>
			</li>
		</ul>
	</form>

	<!-- This a list of all products -->
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
