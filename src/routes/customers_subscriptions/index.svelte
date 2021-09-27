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
		{#each customers_subscriptions as { id, first_name, last_name, customers_subscriptions }}
			<li class="box">
				<h2>
					<input hidden name="id" value={id} />
					<label for="">
						{first_name}
						{last_name}:
					</label>
				</h2>
				{#each customers_subscriptions as { subscription }}
					<ul>
						<li>
							<form action="/deliveries.json" method="post">
								<input
									type="text"
									name="customer"
									value={id}
								/>
								<input
									hidden
									type="text"
									name="price"
									value={subscription.price}
								/>
								<input
									hidden
									type="text"
									name="subscription"
									value={subscription.name}
								/>
								<input
									type="submit"
									value="Deliver"
									name="subscription"
								/>
								<label for="">{subscription.name}</label>
							</form>
						</li>
					</ul>
				{/each}
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
	li {
		margin: 1rem;
	}
</style>
