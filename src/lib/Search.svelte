<script>
    const url = "https://www.googleapis.com/customsearch/v1"
    const key = "AIzaSyBdwZ8mD2Qp6B_dTB2aoXVKsydyCFxmDsM"
    const cx = "e3f5f8fb47d86da45"

    import {exportUrl, extractInfo, extractImages} from "./store";

    let context = ""
    let links = []
    let start = 0

    let attribute = extractInfo.getJson();
    let imageLinks = extractImages.getLinks();

    globalThis.getExtractInfo = () => ({links, attribute: $attribute, imageLinks: $imageLinks})

    function initExtract() {
        start = 0
        links = []
        extractInfo.clear()
        extractImages.clear()
    }

    async function searchResult() {
        exportUrl.set("")

        initExtract()

        let searchUrl = `http://localhost:5000/searchAndExtract?keyWord=${context}&start=${start}`;
        let response = await fetch(searchUrl);
        let {urlLinks, attribute: resAttribute, imageLinks: resImageLinks} = await response.json();
        links = [...urlLinks];
        extractInfo.init(resAttribute);
        extractImages.init(resImageLinks);
    }

    async function addSearchResult() {
        console.log("start to add")
        start += 10
        let searchUrl = `http://localhost:5000/search?keyWord=${context}&start=${start}`;
        let response = await fetch(searchUrl);
        let addLink = await response.json();
        links = [...links, ...addLink];
    }


    function removeLink(removeIndex) {
        links = links.filter((_, index) => index !== removeIndex)
    }

    function outputResult() {
        let output = {
            links: links,
            attribute: $attribute,
            imagesLinks: $imageLinks,
        }
        console.log(JSON.stringify(output))
    }


</script>

<div>
    <input type="text" bind:value={context}>
    <button type="button" on:click={searchResult}>确定</button>
    <button type="button" on:click={addSearchResult}>添加后续结果</button>
    <button type="button" on:click={outputResult}>输出</button>
    <hr>
    {#if links.length > 0}
        {#each links as [link, title],index (index)}
            <a href="javascript:void(0);" on:click={()=>{window.open(link)}}>{title}</a>&nbsp;
            <button on:click={()=>removeLink(index)}>删除</button>
            <button type="button" on:click={()=>exportUrl.set(link)}>预览</button>
            <br>
        {/each}
    {/if}
</div>