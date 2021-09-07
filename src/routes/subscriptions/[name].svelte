<script context="module">
    export async function load({ fetch, page }) {
        const { name } = page.params;
        const res = await fetch(`/subscriptions/${name}.json`);
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
    <h1>{product[0].name}</h1>
    <div class="box">
        <ul>
            <li>Price: $ {product[0].price}</li>
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
