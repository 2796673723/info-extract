<script>
    const url = "https://www.googleapis.com/customsearch/v1"
    const key = "AIzaSyBdwZ8mD2Qp6B_dTB2aoXVKsydyCFxmDsM"
    const cx = "e3f5f8fb47d86da45"

    import {extractUrl} from "./store";

    let context = ""
    let links = []

    async function searchResult() {
        extractUrl.set("")
        links = []
        let searchUrl = `${url}?key=${key}&cx=${cx}&q=${context}`
        let response = await fetch(searchUrl);
        let result = await response.json()
        for (const item of result?.items) {
            if (item.link.includes("wikipedia.org") && $extractUrl === "") extractUrl.set(item.link)
            links.push([item.link, item.title])
        }
    }
</script>

<div>
    <input type="text" bind:value={context}>
    <button type="button" on:click={searchResult}>确定</button>
    <hr>
    {#if links.length > 0}
        {#each links as [link, title],index (index)}
            <a href="javascript:void(0);" on:click={()=>{window.open(link)}}>{title}</a><br>
        {/each}
    {/if}
</div>