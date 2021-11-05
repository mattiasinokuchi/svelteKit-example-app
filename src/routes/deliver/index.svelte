<!--	This is the delivery page	-->
<script context="module">
	export async function load({ fetch }) {
		let res = null;
		try {
			res = await fetch("/deliver.json");
			const customer = await res.json();
			res = await fetch("/deliver/get_counts.json");
			const count = await res.json();
			return {
				props: {
					customer,
					count,
				},
			};
		} catch (error) {
			return error;
		}
	}
</script>

<script>
	export let customer, count;
</script>

<main>
	<!-- This is a undo buttton -->
	<div class="box">
		<form action="/deliver/undo.json?_method=delete" method="post">
			<input type="submit" value="Undo last delivery" />
		</form>
	</div>

	<!-- This a list with counts of products to deliver	-->
	<h2 hidden={count.length > 0}>No delivery to do. Relax!</h2>
	<div hidden={count.length < 1} class="box">
		<h2>To deliver:</h2>
		{#each count as { product_name, count }}
			{count} x {product_name}
			<br />
		{/each}
	</div>
	
	<!-- This is a list of customers and products -->
	{#each customer as { customer_id, first_name, last_name, orders }}
		<div class="box">
			<h2>
				{first_name}
				{last_name}:
			</h2>
			{#each orders as { order_id, product_name, product_id, price }}
				<form action="/deliver.json" method="post">
					<input hidden name="customer_id" value={customer_id} />
					<input hidden name="order_id" value={order_id} />
					<input hidden name="price" value={price} />
					<input hidden name="product_name" value={product_name} />
					<input hidden name="product_id" value={product_id} />
					<input type="submit" value={product_name} />
				</form>
			{/each}
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
