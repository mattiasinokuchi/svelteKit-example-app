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

	// This block requests a delivery order to be updated
	async function reorder(id, delivery_order) {
		try {
			const url = "/customer/reorder_delivery_copy.json";
			await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					id: id,
					order: delivery_order,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	}
/*
	import { onMount } from "svelte";

	// This block handles duplicate numbers in the delivery order
	onMount(async () => {
		for (let index = 0; index < customer.length; index++) {
			if (
				index !== 0 &&
				customer[index].delivery_order ===
					customer[index - 1].delivery_order
			) {
				if (
					customer[index].updated_at < customer[index - 1].updated_at
				) {
					let deliveryOrder = customer[index].delivery_order;
					deliveryOrder++;
					const id = customer[index].id;
					reorder(id, deliveryOrder);
				} else {
					let deliveryOrder = customer[index - 1].delivery_order;
					deliveryOrder++;
					const id = customer[index - 1].id;
					reorder(id, deliveryOrder);
				}
			}
		}
	});	*/
</script>

<main>
	<!-- This is a form for adding new customers -->
	<form class="box" action="/customer.json" method="post">
		<h2>New customer</h2>
		<label for="firstName">First Name</label>
		<input
			type="text"
			id="firstName"
			name="firstName"
			aria-label="Add customer"
			placeholder="First name"
		/>
		<br />
		<label for="lastName">Last Name</label>
		<input
			type="text"
			id="lastName"
			name="lastName"
			aria-label="Add customer"
			placeholder="Last name"
		/>
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
			<form on:submit|preventDefault={reorder(id, delivery_order)}>
				<label for="order">Delivery order</label>
				<input size="2" bind:value={delivery_order} />
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
