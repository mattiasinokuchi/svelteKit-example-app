<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/subscriptions.json");
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

<main>
	{#each subscription as { name, emoji, id }}
		<a sveltekit:prefetch href={`/subscriptions/${id}`} class="box">
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
