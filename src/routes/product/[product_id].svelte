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
    <h2>{product.product_name}</h2>
    <!-- This is a form for product information -->
    <form action="/product/update_product.json" method="post">
        <input type="hidden" name="product_id" value={product.product_id} />
        <p>
            <label for="product_name">Product Name</label>
            <input
                type="text"
                id="product_name"
                name="product_name"
                value={product.product_name}
            />
        </p>
        <p>
            <label for="price">Price ($)</label>
            <input
                type="number"
                id="price"
                name="price"
                value={product.price}
            />
        </p>
        <p>
            <label for="delivery_interval">Delivery Interval</label>
            <input
                type="number"
                min="1"
                max="999"
                id="delivery_interval"
                name="delivery_interval"
                value={product.delivery_interval}
            />
        </p>
        <input type="submit" value="Update" />
    </form>
</main>

<style>
    main {
        margin: 4rem;
        padding: 2rem;
        color: gray;
        justify-content: center;
        box-shadow: 4px 5px 11px 10px lightgray;
    }
    h2 {
        color: salmon;
    }
</style>
