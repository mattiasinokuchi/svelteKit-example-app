<!-- This is the page for billing -->
<script context="module">
	export async function load({ fetch }) {
		let res = null;
		try {
			res = await fetch("/billing.json");
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

	for (let i = 0; i < customer.length; i++) {
		const sum = customer[i].order_.reduce(function (acc, cur) {
			if(cur.past_delivery != null) {
				return acc + cur.past_delivery.length * cur.product.price;
			}
		}, 0);
		customer[i]['toPay'] = sum;
	}
</script>

<main>
	<h2 hidden={customer.length>0}>
		No billing to do. Relax!
	</h2>
	<ul>
		{#each customer as { first_name, last_name, order_, toPay }}
		{#if toPay != null && toPay !== 0}
		<li class="box">
			<h2>
				{first_name}
				{last_name}:
			</h2>
			{#each order_ as { id, past_delivery, product }}
				{#if past_delivery != null}
					{product.name}, ${product.price}:
					<form action="/billing.json" method="post">
						<ul>
							<li>
								<input hidden name="id" value={id} />
								{#if past_delivery != null}
									{#each past_delivery as date}
										<ul>
											<li>
												{date}
											</li>
										</ul>
									{/each}
								{/if}
							</li>
						</ul>
						<input type="submit" value="Clear" />
					</form>
					<br />
				{/if}
			{/each}
			Total: ${toPay}
		</li>
		{/if}
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
