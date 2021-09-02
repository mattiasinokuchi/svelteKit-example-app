<script context="module">
    export async function load({ fetch, page }) {
        const { name } = page.params;
        const res = await fetch(`/api/subscriptions/${name}`);

        if (res.ok) return { props: { product: await res.json() } };
        return {
            status: res.status,
            error: new Error(),
        };
    }
</script>

<script>
    export let product;
</script>

<main>
    <h1>{product.name}</h1>
    <div class="box">
        <ul>
            <li>Price: {product.name}</li>
        </ul>
    </div>
</main>

<style>
    main {
        margin: 4rem;
        padding: 2rem;
        color: gray;
        justify-content: center;
        box-shadow: 4px 5px 11px 10px lightgray;
    }
    h1 {
        color: salmon;
    }
    .box {
        display: flex;
        font-size: 1.5rem;
    }
    li {
        margin-bottom: 1rem;
    }
</style>
