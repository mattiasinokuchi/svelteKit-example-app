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
</script>

<main>
	<h2 hidden={customer.length > 0}>No billing to do. Relax!</h2>
	{#each customer as { first_name, last_name, delivery, to_pay, customer_id, time_stamp }}
		<div class="box">
			<h2>
				{first_name}
				{last_name}:
			</h2>
			{#each delivery as { delivery_date, product_name, price }}
				<p>
					{delivery_date}: {product_name} (${price})
				</p>
			{/each}
			Total: ${to_pay}
			<form action="/billing.json?_method=delete" method="post">
				<!-- following input prevents unintentional deletion during ongoing delivery -->
				<input hidden name="time_stamp" value={time_stamp} />
				<input hidden name="customer_id" value={customer_id} />
				<input type="submit" value="Clear" />
			</form>
		</div>
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
