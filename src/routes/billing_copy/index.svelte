<!-- This is the page for billing -->
<script context="module">
	export async function load({ fetch }) {
		let res = null;
		try {
			res = await fetch("/billing_copy.json");
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
	{#each customer as { first_name, last_name, delivery, to_pay }}
		<div class="box">
			<h2>
				{first_name}
				{last_name}:
			</h2>
			{#each delivery as { date, delivery_id, product, price }}
				{date}
				{product} ${price}
				<form action="/billing_copy.json?_method=delete" method="post">
					<input hidden name="id" value={delivery_id} />
					<input type="submit" value="Clear" />
				</form>
			{/each}
			Total: ${to_pay}
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
