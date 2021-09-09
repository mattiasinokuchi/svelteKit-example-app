<script>
	import { onMount } from "svelte";

	let subscriptions = [];

	onMount(async () => {
		const res = await fetch(`/subscriptions.json`);
		subscriptions = await res.json();
	});
</script>

<form action="/customers_subscriptions.json" method="post">
	<label for="subscription-select">Choose a subscription:</label>
	<select name="subscriptions" id="subscription-select">
		<option value="">- Please choose an option -</option>
		{#each subscriptions as { name, emoji, id }}
			<option value={name}>{name}</option>
		{/each}
	</select>
	<label for="lastName">Last Name</label>
	<input
		type="text"
		id="lastName"
		name="lastName"
		aria-label="Add customer"
		placeholder="Last name"
	/>
	<button type="submit">Submit</button>
</form>

<style>
	form {
		/* Center the form on the page */
		margin: 0 auto;
		width: 60vw;
		/* Form outline */
		padding: 1em;
		border: 1px solid #ccc;
		border-radius: 1em;
	}

	label {
		/* Uniform size & alignment */
		width: 20vw;
		text-align: right;
	}

	input {
		/* To make sure that all text fields have the same font settings
     By default, textareas have a monospace font */
		font: 1em sans-serif;

		/* Match form field borders */
		border: 1px solid #999;
	}

	input:focus {
		/* Additional highlight for focused elements */
		border-color: #000;
	}

	button {
		/* This extra margin represent roughly the same space as the space
     between the labels and their text fields */
		margin-left: 0.5em;
	}
</style>
