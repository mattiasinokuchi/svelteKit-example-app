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
</script>

<main>
	<ul>
		<li class="box">
			<a sveltekit:prefetch href='/customers_subscriptions/new'>
				<h2>Add Customers Subscriptions</h2>
			</a>
		</li>
		{#each customers_subscriptions as { customer, subscription, id }}
			<li class="box">
				<h2>
					{customer}: {subscription}
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
		color: salmon;
		box-shadow: 4px 5px 11px 2px lightgray;
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	ul {
		list-style-type: none;
	}
	a {
		text-decoration: none;
		color: salmon;
	}
</style>
