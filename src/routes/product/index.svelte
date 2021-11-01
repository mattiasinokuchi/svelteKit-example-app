<!--	This is the parent page for products	-->
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
	let subscription = false;
</script>

<main>
	<!-- This is a form for adding new products -->
	<form class="box" action="/product.json" method="post">
		<h2>New product</h2>
		<input
			type="checkbox"
			id="subscription"
			name="subscription"
			bind:checked={subscription}
		/>
		<!-- Fix for submitting unchecked as default value -->
		<input
			type="hidden"
			id="subscription"
			name="subscription"
			value=false
		/>
		<label for="subscription">Subscription</label>
		<br />
		<label hidden={!subscription} for="delivery_interval"
			>Delivery interval (days)</label
		>
		<input
			hidden={!subscription}
			type="number"
			min="1"
			max="999"
			value=1
			id="delivery_interval"
			name="delivery_interval"
			aria-label="Add product"
		/>
		<br />
		<label for="product_name">Name</label>
		<input
			type="text"
			id="product_name"
			name="product_name"
			aria-label="Add product"
		/>
		<br />
		<label for="price">Price ($)</label>
		<input type="number" id="price" name="price" aria-label="Add product" />
		<br />
		<button type="submit">Submit</button>
	</form>

	<!-- This a list of all products -->
	{#each product as { product_name, product_id }}
		<a class="box" sveltekit:prefetch href={`/product/${product_id}`}>
			<h2>{product_name}</h2>
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
