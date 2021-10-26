<!-- This is the delivery page -->
<script context="module">
	export async function load({ fetch }) {
		let res = null;
		try {
			res = await fetch("/deliver_copy.json");
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
	/*	export let currentDate = new Date().toISOString().split("T")[0];

	// Count products
	let countObject = {};
	for (let i = 0; i < customer.length; i++) {
		customer[i].order_.reduce(function (allProductsObject, order) {
			if (
				order.past_delivery && order.past_delivery.includes(currentDate)
			) {
				allProductsObject[order.product.name];
			} else if (order.product.name in allProductsObject) {
				allProductsObject[order.product.name]++;
			} else {
				allProductsObject[order.product.name] = 1;
			}
			return allProductsObject;
		}, countObject);
	}
	export let count = [];
	Object.entries(countObject).forEach((entry) => {
		const [key, value] = entry;
		const newObject = { name: key, quantity: value };
		count.push(newObject);
	});	*/
</script>

<main>
	<!-- This a list with counts of products to deliver
	<h2 hidden={customer.length > 0}>No delivery to do. Relax!</h2>
	<div hidden={count.length < 1} class="box">
		<h2>To deliver:</h2>
		{#each count as { name, quantity }}
			{quantity} x {name}
			<br>
		{/each}
	</div>	 -->
	<!-- This is a list of customers and products -->
	{#each customer as { customer_id, first_name, last_name, orders }}
		<div class="box">
			<h2>
				{first_name}
				{last_name}:
			</h2>
			{#each orders as { order_id, product, price }}
				<form action="/deliver_copy.json" method="post">
					<input hidden name="customer_id" value={customer_id} />
					<input hidden name="order_id" value={order_id} />
					<input hidden name="price" value={price} />
					<input hidden name="product_name" value={product} />
					<input type="submit" value={product} />
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
