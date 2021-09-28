<script context="module">
    export async function load({ fetch, page }) {
        const { id } = page.params;
        const res = await fetch(`/subscriptions/${id}.json`);
        if (res.ok) {
            const subscription = await res.json();
            return {
                props: { subscription },
            };
        }
        const { message } = await res.json();
        return {
            error: new Error(message),
        };
    }
</script>

<script>
    export let subscription;
</script>
{#if false}<slot></slot>{/if}
<main>
    <h1>{subscription.name}</h1>
    <div class="box">
        <ul>
            <li>Price: ${subscription.price}</li>
            <li>Interval: {subscription.time_interval} days</li>
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
