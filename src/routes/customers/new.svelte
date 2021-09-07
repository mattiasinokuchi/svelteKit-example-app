<script>
</script>

<form
	class="new"
	action="/customers.json"
	method="post"
>
	<input
		name="firstName"
		aria-label="Add customer"
		placeholder="First name"
	/>
	<input
		name="lastName"
		aria-label="Add customer"
		placeholder="Last name"
	/>
	<input type="submit" value="submit">
</form>

<style>
	.new input {
		font-size: 28px;
		background: rgba(255, 255, 255, 0.05);
		text-align: center;
	}
</style>
