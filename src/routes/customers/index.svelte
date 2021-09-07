<script context="module">
	import { enhance } from "$lib/form";
	export async function load({ fetch }) {
		const res = await fetch("/customers.json");
		if (res.ok) {
			const customers = await res.json();
			return {
				props: { customers },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let customers;
</script>

<form
	class="new"
	action="/customers.json"
	method="post"
	use:enhance={{
		result: async (res, form) => {
			const created = await res.json();
			customers = [...customers, created];
			form.reset();
		},
	}}
>
	<input
		name="text"
		aria-label="Add customer"
		placeholder="+ tap to add a customer"
	/>
</form>

<main>
	<ul>
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
	}
	.new {
		margin: 0 0 0.5rem 0;
	}
	input {
		border: 1px solid transparent;
	}
	input:focus-visible {
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #ff3e00 !important;
		outline: none;
	}
	.new input {
		font-size: 28px;
		width: 100%;
		padding: 0.5em 1em 0.3em 1em;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		text-align: center;
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
