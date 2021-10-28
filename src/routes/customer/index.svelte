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
		<label for="firstName">First Name</label>
		<input type="text" id="firstName" name="firstName" />
		<br />
		<label for="lastName">Last Name</label>
		<input type="text" id="lastName" name="lastName" />
		<br />
		<button type="submit">Submit</button>
	</form>

	<!---	This is a list of customers with a form
			for changing their delivery order	-->
	{#each customer as { first_name, last_name, id, delivery_order }}
		<div class="box">
			<a sveltekit:prefetch href={`/customer/${id}`}>
				<h2>{first_name} {last_name}</h2>
			</a>
			<form action="/customer/reorder_delivery.json" method="post">
				<label for="order">Delivery order</label>
				<input hidden name="id" value={id} />
				<input type="number" name="order" value={delivery_order} />
				<input type="submit" value="Reorder" />
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
	a {
		text-decoration: none;
		color: salmon;
	}
	input {
		margin: 1vw;
	}
</style>
