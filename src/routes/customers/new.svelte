<script>
	import { onMount } from "svelte";
	let products = [];
	onMount(async () => {
		const res = await fetch(`/subscriptions.json`);
		products = await res.json();
	});
</script>

<form class="new" action="/customers.json" method="post">
	<input
		name="firstName"
		aria-label="Add customer"
		placeholder="First name"
	/>
	<input name="lastName" aria-label="Add customer" placeholder="Last name" />
	<input type="submit" value="submit" />
</form>

{#await products}
	<p>...waiting</p>
{:then products}
	<p>Available products are: 
	{#each products as {name}}
		<p>{name}</p>
	{/each}
</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	.new input {
		font-size: 28px;
		background: rgba(255, 255, 255, 0.05);
		text-align: center;
	}
</style>
