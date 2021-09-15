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
	<ul>
		{#each subscription as { name, emoji, id, customers_subscriptions }}
			<li class="box">
				<a sveltekit:prefetch href={`/subscriptions/${id}`}>
					<h2>{customers_subscriptions.length} x {name}</h2>
					<h2>{emoji}</h2>
				</a>
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
	h2 {
		color: salmon;
	}
	a {
		text-decoration: none;
		color: salmon;
	}
</style>
