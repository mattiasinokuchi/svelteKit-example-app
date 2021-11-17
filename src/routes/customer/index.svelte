<!--	This is the parent page for customers	-->
<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/customer.json");
		if (res.ok) {
			const customer = await res.json();
			return {
				props: { customer },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let customer;
</script>

<main>
	<!-- This is a form for adding new customers -->
	<form class="box" action="/customer.json" method="post">
		<h2>New customer</h2>
		<label for="first_name">First Name</label>
		<input type="text" id="first_name" name="first_name" />
		<br />
		<label for="last_name">Last Name</label>
		<input type="text" id="last_name" name="last_name" />
		<br />
		<button type="submit">Submit</button>
	</form>

	<h2 hidden={customer.length > 0}>No customers. Add someone!</h2>

	<!---	This is a list of customers with a form
			for changing their delivery order	-->
	{#each customer as { first_name, last_name, customer_id, delivery_order }}
		<a sveltekit:prefetch href={`/customer/${customer_id}`}>
			<div class="box">
				<h2>{first_name} {last_name}</h2>
				<form action="/customer/reorder_delivery.json" method="post">
					<label for="delivery_order">Delivery order</label>
					<input hidden name="customer_id" value={customer_id} />
					<input
						type="number"
						name="delivery_order"
						min="1"
						max="999"
						value={delivery_order}
					/>
					<input type="submit" value="Reorder" />
				</form>
			</div>
		</a>
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
	a {
		text-decoration: none;
		color: salmon;
	}
	input {
		margin: 1vw;
	}
	label {
		color: black;
	}
</style>
