<script>
</script>

<form action="/customers_subscriptions.json" method="post">
	<label for="subscription-select">Choose a subscription:</label>
	<select name="subscriptions" id="subscription-select">
		<option value="">- Please choose an option -</option>
		<option value="dog">Dog</option>
		<option value="cat">Cat</option>
		<option value="hamster">Hamster</option>
		<option value="parrot">Parrot</option>
		<option value="spider">Spider</option>
		<option value="goldfish">Goldfish</option>
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

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	form li + li {
		margin-top: 1em;
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

	#firstName,
	#lastName {
		/* Uniform text field size */
		width: 300px;
		box-sizing: border-box;
	}

	input:focus {
		/* Additional highlight for focused elements */
		border-color: #000;
	}

	.button {
		/* Align buttons with the text fields */
		padding-left: 90px; /* same size as the label elements */
	}

	button {
		/* This extra margin represent roughly the same space as the space
     between the labels and their text fields */
		margin-left: 0.5em;
	}
</style>
