<!-- This is the page for subscription -->

<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/subscription.json");
		if (res.ok) {
			const subscription = await res.json();
			return {
				props: { subscription },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let subscription;
</script>
{#if false}<slot></slot>{/if}
<main>
	<ul>
		{#each subscription as { id, first_name, last_name, subscription }}
			<li class="box">
				<h2>
					<input hidden name="id" value={id} />
					<label for="">
						{first_name}
						{last_name}:
					</label>
				</h2>
				{#each subscription as { id, product }}
					<ul>
						<li>
							<form action="/delivery.json" method="post">
								<input
									hidden
									type="text"
									name="price"
									value={product.price}
								/>
								<input
									type="submit"
									value={id}
									name="subscription"
								/>
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
