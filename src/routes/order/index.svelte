<!-- This is the page for order -->
<script context="module">
	export async function load({ fetch }) {
		let res = null;
		try {
			res = await fetch("/order.json");
			const order = await res.json();
			return {
				props: {
					order,
				},
			};
		} catch (error) {
			return error;
		}
	}
</script>

<script>
	export let order
</script>

{#if false}<slot />{/if}
<main>
	<ul>
		{#each order as { id, first_name, last_name, order_book, delivery }}
			<li class="box">
				<h2>
					{first_name}
					{last_name}:
				</h2>
				{#each delivery as {created_at}}
					<p>{created_at}</p>	
				{/each}
				{#each order_book as { product }}
					<ul>
						<li>
							<form
								action="/order/deliver.json"
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
