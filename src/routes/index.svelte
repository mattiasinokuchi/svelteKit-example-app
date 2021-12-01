
<script context="module">
    export async function load(request) {
        console.log(request);
        return {
            status: 302,
            redirect: "/product"
        };
    }
</script>