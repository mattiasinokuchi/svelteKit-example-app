<!--	This is the delivery page	-->
<script context="module">
	export async function load({ fetch, page }) {
		try {
			const { delivery_date } = page.params;
			let res = await fetch(`/deliver/${delivery_date}.json`);
			const delivery = await res.json();
			res = await fetch(`/deliver/get_todays_deliveries.json`);
			const todays_delivery = await res.json();
			return {
				props: {
					delivery,
					delivery_date,
					todays_delivery
				},
			};
		} catch (error) {
			return error;
		}
	}
</script>

<script>
	export let delivery, delivery_date, todays_delivery;
	const today = new Date().toISOString().slice(0, 10);
</script>

<main>
	<div class="box">
		<h1>{delivery_date}</h1>
		<!-- This is a undo buttton -->
		<form action="/deliver/undo.json?_method=delete" method="post">
			<input type="submit" value="Undo last delivery" hidden={delivery_date !== today} disabled={todays_delivery.length<1}/>
		</form>
	</div>

	<h2 hidden={delivery.length > 0}>No delivery to do. Relax!</h2>

	<!-- This is a list of customers and products to deliver-->
	{#each delivery as { customer_id, first_name, last_name, street_address, city, orders }}
		<div class="box">
			<h2>
				{first_name}
				{last_name}:
			</h2>
			<p>{street_address}, {city}</p>
			{#each orders as { order_id, product_name, product_id, price }}
				<form action="/deliver/deliver.json" method="post">
					<input hidden name="customer_id" value={customer_id} />
					<input hidden name="order_id" value={order_id} />
					<input hidden name="price" value={price} />
					<input hidden name="product_name" value={product_name} />
					<input hidden name="product_id" value={product_id} />
					<input type="submit" value={product_name} disabled={delivery_date !== today} />
				</form>
			{/each}
		</div>
	{/each}
</main>

<style>
</style>
