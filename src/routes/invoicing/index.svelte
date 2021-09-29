<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/delivery.json");
		if (res.ok) {
			const delivery = await res.json();
			return {
				props: { delivery },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let delivery;
</script>
{#if false}<slot></slot>{/if}
<main>
	<ul>
		{#each delivery as { created_at, subscription }}
			<li class="box">
				{created_at},
				{subscription}
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
