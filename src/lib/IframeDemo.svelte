<script>
    import {exportUrl} from "./store";
</script>

{#if $exportUrl !== ""}
    <button on:click={()=>exportUrl.set("")}>关闭</button>
    <br>
    <iframe src={$exportUrl}></iframe>
{/if}

<style>
    iframe {
        width: 100%;
        height: 500px;
    }
</style>