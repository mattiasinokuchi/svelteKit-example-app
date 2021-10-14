<!-- This is the delivery page -->
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
	});
</script>

<main>
	<!-- This a list with counts of products to deliver -->
	<h2 hidden={customer.length > 0}>No delivery to do. Relax!</h2>
	<div hidden={count.length < 1} class="box">
		<h2>To deliver:</h2>
		{#each count as { name, quantity }}
			{quantity} x {name}
			<br>
		{/each}
	</div>
	<!-- This is a list of customers and products -->
	{#each customer as { first_name, last_name, order_ }}
		<div class="box">
			<h2>
				{first_name}
				{last_name}:
			</h2>
			{#each order_ as { id, past_delivery, product }}
				<form action="/deliver.json" method="post">
					<input hidden name="past_delivery" value={past_delivery} />
					<input hidden name="id" value={id} />
					<input
						hidden={past_delivery != null &&
							past_delivery.includes(currentDate)}
						type="submit"
						value={product.name}
					/>
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
