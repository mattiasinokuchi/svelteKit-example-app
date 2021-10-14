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

	// This block sums the amount customers should pay
	for (let i = 0; i < customer.length; i++) {
		const sum = customer[i].order_.reduce(function (acc, cur) {
			if (cur.past_delivery !== null) {
				return acc + cur.past_delivery.length * cur.product.price;
			} else {
				return acc;
			}
		}, 0);
		customer[i]["toPay"] = sum;
	}
</script>

<main>
	<h2 hidden={customer.length > 0}>No billing to do. Relax!</h2>
	{#each customer as { first_name, last_name, order_, toPay }}
		{#if toPay != null && toPay !== 0}
			<div class="box">
				<h2>
					{first_name}
					{last_name}:
				</h2>
				{#each order_ as { id, past_delivery, product }}
					{#if past_delivery != null && past_delivery.length > 0}
						{product.name}, ${product.price}:
						<form action="/billing.json" method="post">
							<input hidden name="id" value={id} />
							{#each past_delivery as date}
								<p>- {date}</p>
							{/each}
							<input type="submit" value="Clear" />
						</form>
						<br />
					{/if}
				{/each}
				Total: ${toPay}
			</div>
		{/if}
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
	input {
		margin: 1vw;
	}
</style>
