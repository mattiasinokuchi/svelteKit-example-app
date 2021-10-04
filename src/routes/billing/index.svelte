<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/billing.json");
		if (res.ok) {
			const billing = await res.json();
			return {
				props: { billing },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let billing;
</script>
{#if false}<slot></slot>{/if}
<main>
	<ul>
		{#each billing as { customer, created_at, product_name, price }}
			<li class="box">
				{created_at},
				{customer.first_name} {customer.last_name},
				{product_name},
				${price}
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
	ul {
		list-style-type: none;
	}
</style>
