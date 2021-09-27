<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/deliveries.json");
		if (res.ok) {
			const deliveries = await res.json();
			return {
				props: { deliveries },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let deliveries;
</script>

<main>
	<ul>
		{#each deliveries as { first_name, last_name, deliveries }}
			<li class="box">
				<h2>
					<label for="">
						{first_name}
						{last_name}:
					</label>
				</h2>
				{#each deliveries as { created_at, subscription, price }}
					<p>{created_at}</p>
					<p>{subscription}</p>
					<p>{price}</p>
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
</style>
