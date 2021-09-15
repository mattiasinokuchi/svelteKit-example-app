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
	<ul>
		{#each customers_subscriptions as { customer, subscription, id }}
			<li class="box">
				<h2>
					{customer.first_name}
					{customer.last_name}: {subscription.name}
				</h2>
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
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	h2 {
		color: salmon;
	}
	ul {
		list-style-type: none;
	}
</style>
