<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/api/customers");

		if (res.ok) return { props: { customers: await res.json() } };
		return {
			status: res.status,
			error: new Error(),
		};
	}
</script>

<script>
	export let customers;
</script>

<main>
	<ul>
		<li class="box"><a href={`/customers/new`}><h2>Add New Customer</h2></a></li>
		{#each customers as { firstName, lastName }}
			<li class="box">
				<a sveltekit:prefetch href={`/customers/${lastName}`}>
					<h2>{firstName} {lastName}</h2>
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80vh;
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
	ul {
		list-style-type: none;
	}
	a {
		text-decoration: none;
		color: salmon;
	}
</style>
