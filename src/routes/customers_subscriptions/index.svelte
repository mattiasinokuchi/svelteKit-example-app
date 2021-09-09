<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/customers_subscriptions.json");
		if (res.ok) {
			const customers_subscriptions = await res.json();
			return {
				props: { customers_subscriptions },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let customers_subscriptions;
	import { onMount } from "svelte";

	let subscriptions = [];
	let customers = [];

	onMount(async () => {
		let res = await fetch(`/subscriptions.json`);
		subscriptions = await res.json();
		res = await fetch(`/customers.json`);
		customers = await res.json();
	});
</script>

<main>
	<fieldset>
		<legend>Add Customers Subscriptions</legend>
		<form action="/customers_subscriptions.json" method="post">
			<label for="customer-select">Choose a customer:</label>
			<select name="customer" id="customer-select">
				<option value="">- Please choose an option -</option>
				{#each customers as { first_name, last_name, id }}
					<option value={id}>{first_name} {last_name}</option>
				{/each}
			</select>
			<label for="subscription-select">Choose a subscription:</label>
			<select name="subscription" id="subscription-select">
				<option value="">- Please choose an option -</option>
				{#each subscriptions as { name, emoji, id }}
					<option value={id}>{name}</option>
				{/each}
			</select>
			<button type="submit">Submit</button>
		</form>
	</fieldset>

	<ul>
		{#each customers_subscriptions as { customer, subscription, id }}
			<li class="box">
				<h2>
					{customer.first_name}
					{customer.last_name}: {subscription.name}
				</h2>
				<form
					action="/customers_subscriptions/{id}.json?_method=delete"
					method="post"
				>
					<button type="submit">Delete</button>
				</form>
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
		color: salmon;
		box-shadow: 4px 5px 11px 2px lightgray;
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	ul {
		list-style-type: none;
	}
</style>
