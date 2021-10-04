<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/schedule.json");
		if (res.ok) {
			const schedule = await res.json();
			return {
				props: { schedule },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let schedule;
</script>
{#if false}<slot></slot>{/if}
<main>
	<ul>
		{#each schedule as { delivery_date, product }}
			<li class="box">
				{delivery_date}, {product}
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
		width: 40vw;
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	ul {
		list-style-type: none;
		text-align: center;
	}
</style>
