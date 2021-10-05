<!-- This is the page for delivery -->
<script context="module">
	export async function load({ fetch }) {
		let res = null;
		try {
			res = await fetch("/deliver.json");
			const deliver = await res.json();
			return {
				props: {
					deliver,
				},
			};
		} catch (error) {
			return error;
		}
	}
</script>

<script>
	export let deliver
</script>

{#if false}<slot />{/if}
<main>
	<ul>
		{#each deliver as { id, first_name, last_name, order_book }}
			<li class="box">
				<h2>
					{first_name}
					{last_name}:
				</h2>
				{#each order_book as { product }}
					<ul>
						<li>
							<form
								action="/deliver/deliver.json"
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
