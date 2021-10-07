<!-- This is the page for delivery -->
<script context="module">
	export async function load({ fetch }) {
		let res = null;
		try {
			res = await fetch("/deliver.json");
			const customer = await res.json();
			return {
				props: {
					customer,
				},
			};
		} catch (error) {
			return error;
		}
	}
</script>

<script>
	export let customer;
	export let currentDate = new Date().toISOString().split("T")[0];
</script>

<main>
	<h2 hidden={customer.length>0}>
		No delivery to do. Relax!
	</h2>
	<ul>
		{#each customer as { first_name, last_name, order_ }}
			<li class="box">
				<h2>
					{first_name}
					{last_name}:
				</h2>
				{#each order_ as { id, past_delivery, product }}
					<ul>
						<li>
							<form action="/deliver.json" method="post">
								<input
									hidden
									name="past_delivery"
									value={past_delivery}
								/>
								<input hidden name="id" value={id} />
								<input
									hidden={past_delivery != null &&
										past_delivery.includes(currentDate)}
									type="submit"
									value={product.name}
								/>
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
