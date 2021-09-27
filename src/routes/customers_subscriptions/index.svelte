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
		{#each customers_subscriptions as { first_name, last_name, customers_subscriptions }}
			<form action="">
				<li class="box">
					<h2>
						<label for="">
							{first_name}
							{last_name}:
						</label>
					</h2>
					{#each customers_subscriptions as { subscription }}
						<input type="checkbox" checked="true" />
						<label for="">{subscription.name}</label>
					{/each}
					<br>
					<input type="submit" value="Deliver">
				</li>
			</form>
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
