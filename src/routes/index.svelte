<main>
	<h1>
		<a sveltekit:prefetch href="." class="box">HOME</a>
		<a sveltekit:prefetch href="/about" class="box">ABOUT</a>
		<a sveltekit:prefetch href="/customers" class="box">CUSTOMERS</a>
	</h1>
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
