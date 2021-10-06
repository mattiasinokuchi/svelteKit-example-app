<!-- This is the page for billing -->
<script context="module">
	export async function load({ fetch }) {
		let res = null;
		try {
			res = await fetch("/billing.json");
			const delivery = await res.json();
			return {
				props: {
					delivery,
				},
			};
		} catch (error) {
			return error;
		}
	}
</script>

<script>
	export let delivery;
</script>

<main>
	<ul>
		{#each delivery as { first_name, last_name, order_ }}
			<li class="box">
				<h2>
					{first_name}
					{last_name}:
				</h2>
				{#each order_ as { id, past_delivery, product }}
					{#if past_delivery.length > 0}
						{product.name}, ${product.price}:
						<form action="/billing.json" method="post">
							<ul>
								<li>
									<input hidden name="id" value={id} />
									{#if past_delivery != null}
										{#each past_delivery as date}
											<ul>
												<li>
													{date}
												</li>
											</ul>
										{/each}
									{/if}
								</li>
							</ul>
							Sum: ${product.price * past_delivery.length}
							<input type="submit" value="Clear" />
						</form>
						<br />
					{/if}
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
