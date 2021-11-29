
<script context="module">
    export async function load() {
        return {
            status: 302,
            redirect: "/product",
            headers: {
                "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"
            }
        };
    }
</script>