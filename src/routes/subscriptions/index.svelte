<script context="module">
	/*export async function load({ fetch }) {
		const res = await fetch("/api/subscriptions");

		if (res.ok) return { props: { subscriptions: await res.json() } };
		return {
			status: res.status,
			error: new Error(),
		};
	}*/
	export async function load({ fetch }) {
		const res = await fetch("/api/subscriptions.json");
		if (res.ok) {
			const subscriptions = await res.json();
			return {
				props: { subscriptions },
			};
		}
		return {
			error: new Error(),
		}
	}
</script>

<script>
	export let subscriptions;
</script>

<main>
	{#each subscriptions as { name, emoji }}
		<a sveltekit:prefetch href={`/subscriptions/${name}`} class="box">
			<h2>{name} {emoji}</h2>
		</a>
	{/each}
</main>

<style>
	main {
		display: flex;
		flex-wrap: wrap;
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
</style>
