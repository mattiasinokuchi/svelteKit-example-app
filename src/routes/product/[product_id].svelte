<!--    This is a specific product page   -->
<script context="module">
    export async function load({ fetch, page }) {
        const { product_id } = page.params;
        const res = await fetch(`/product/${product_id}.json`);
        if (res.ok) {
            const product = await res.json();
            return {
                props: { product },
            };
        }
        const { message } = await res.json();
        return {
            error: new Error(message),
        };
    }
</script>

<script>
    export let product;
</script>

<main>
    <h1>{product.product_name}</h1>
    <h2>Price: ${product.price}</h2>
    {#if product.delivery_interval}
        <h2>Delivery interval: {product.delivery_interval} days</h2>
    {/if}
</main>

<style>
    main {
        margin-top: 4rem;
        text-align: center;
    }
    h1 {
        color: salmon;
    }
    h2 {
        color: gray;
    }
</style>
