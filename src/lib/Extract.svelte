<script>
    import {extractUrl, extractInfo, extractImages} from "./store";
    import InfoList from "./Extract/InfoList.svelte";

    const extractRoute = "http://localhost:5000/extract"

    let info = extractInfo.getJson();

    $:if ($extractUrl !== "") {
        extractInfo.clear()
        extractImages.clear()
        let url = `${extractRoute}?extractUrl=${$extractUrl}`;
        extractUrlInfo(url);
    }

    async function extractUrlInfo(url) {
        let response = await fetch(url);
        let info = await response.json();
        console.log(info)
        extractInfo.init(info.attribute);
        extractImages.init(info.imageLinks);
    }
</script>

{#if (Object.keys($info).length > 0)}
    <InfoList/>
{/if}