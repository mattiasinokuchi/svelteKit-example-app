<!-- This is the parent page for customers -->
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

	async function reorder(id, delivery_order) {
		console.log(
			"reorder of id " + id + " and order " + delivery_order + " called"
		);
		try {
			const url = "/customer/reorder_delivery.json";
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

	import { onMount } from "svelte";

	// This block handles duplicate delivery order numbers
	onMount(async () => {
		for (let index = 0; index < customer.length; index++) {
			if (
				index !== 0 &&
				customer[index].delivery_order ===
					customer[index - 1].delivery_order
			) {
				console.log("duplicates");
				console.log(
					customer[index - 1].first_name +
						" updated " +
						customer[index - 1].updated_at
				);
				console.log(
					customer[index].first_name +
						" updated " +
						customer[index].updated_at
				);
				if (
					customer[index].updated_at < customer[index - 1].updated_at
				) {
					console.log("defer " + customer[index].first_name);
					let deliveryOrder = customer[index].delivery_order;
					deliveryOrder++;
					const id = customer[index].id;
					reorder(id, deliveryOrder);
				} else {
					console.log("defer " + customer[index - 1].first_name);
					let deliveryOrder = customer[index - 1].delivery_order;
					deliveryOrder++;
					const id = customer[index - 1].id;
					reorder(id, deliveryOrder);
				}
			}
		}
	});
</script>

<main>
	<!-- This is a form for adding new customers -->
	<form class="box" action="/customer.json" method="post">
		<h2>New customer</h2>
		<ul>
			<li>
				<label for="firstName">First Name</label>
			</li>
			<li>
				<input
					type="text"
					id="firstName"
					name="firstName"
					aria-label="Add customer"
					placeholder="First name"
				/>
			</li>
			<br />
			<li>
				<label for="lastName">Last Name</label>
			</li>
			<li>
				<input
					type="text"
					id="lastName"
					name="lastName"
					aria-label="Add customer"
					placeholder="Last name"
				/>
			</li>
			<br />
			<li class="button">
				<button type="submit">Submit</button>
			</li>
		</ul>
	</form>

	<!---	This is a list of customers with a form
			for changing their delivery order	-->
	<ul>
		{#each customer as { first_name, last_name, id, delivery_order }}
			<li class="box">
				<a sveltekit:prefetch href={`/customer/${id}`}>
					<h2>{first_name} {last_name}</h2>
				</a>
				<!--	<form

					action="/customer/reorder_delivery/{id}.json?_method=update"
					method="post"
					id='reorder'
				>	-->
				<form on:submit|preventDefault={reorder(id, delivery_order)}>
					<label for="order">Delivery order</label>
					<input size="2" bind:value={delivery_order} />
					<input type="submit" value="Reorder" />
				</form>
				<!--	</form>	-->
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
	}
	.box {
		padding: 0.25rem;
		margin: 1.5rem;
		box-shadow: 4px 5px 11px 2px lightgray;
		width: 40vw;
		text-align: center;
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	ul {
		list-style-type: none;
	}
	h2 {
		color: salmon;
	}
	a {
		text-decoration: none;
		color: salmon;
	}
</style>
