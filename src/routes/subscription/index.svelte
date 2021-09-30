<!-- This is the page for subscription -->
<script context="module">
	export async function load({ fetch }) {
		let res = null;
		try {
			res = await fetch("/subscription.json");
			const subscription = await res.json();
			res = await fetch("/subscription/get_deliveries.json");
			const delivery = await res.json();
			return {
				props: {
					subscription,
					delivery,
				},
			};
		} catch (error) {
			return error;
		}
	}
</script>

<script>
	export let subscription, delivery;
	console.log(delivery);
</script>

{#if false}<slot />{/if}
<main>
	<ul>
		{#each subscription as { id, first_name, last_name, subscription }}
			<li class="box">
				<h2>
					{first_name}
					{last_name}:
				</h2>
				{#each subscription as { product }}
					<ul>
						<li>
							<form
								action="/subscription/deliver.json"
								method="post"
							>
								<input
									hidden name="customer"
									value={id}
								/>
								<input
									hidden
									type="text"
									name="productId"
									value={product.id}
								/>
								<input
									hidden
									type="text"
									name="productName"
									value={product.name}
								/>
								<input
									hidden
									type="text"
									name="price"
									value={product.price}
								/>
								<input type="submit" value={product.name} />
							</form>
						</li>
					</ul>
				{/each}
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
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	h2 {
		color: salmon;
	}
	ul {
		list-style-type: none;
	}
	li {
		margin: 1rem;
	}
</style>
