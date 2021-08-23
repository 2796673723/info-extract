<script>
    import {extractUrl, extractInfo} from "./store";
    import InfoList from "./Extract/InfoList.svelte";

    const extractRoute = "http://localhost:5000/extract"

    let info = extractInfo.getJson();

    $:if ($extractUrl !== "") {
        extractInfo.clear()
        let url = `${extractRoute}?extractUrl=${$extractUrl}`;
        extractUrlInfo(url);
    }

    async function extractUrlInfo(url) {
        let response = await fetch(url);
        let info = await response.json();
        extractInfo.init(info)
    }
</script>

{#if (Object.keys($info).length > 0)}
    <InfoList/>
{/if}
<!--{#each Object.entries($info) as [key, value]}-->
<!--    <p>{key} : {value}</p>-->
<!--{/each}-->