<script>
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import {extractImages} from "./store";

    let images = extractImages.getLinks()

    function deleteImageLink(index) {
        extractImages.delete(index)
    }

    function addImageLink() {
        let url = globalThis.prompt("输入图片链接", "")
        if (url) extractImages.put(url)
    }
</script>

<button on:click={()=>addImageLink()}>添加图片</button><br>

<LayoutGrid>
    {#each $images as link, i}
        <Cell span={2} style="border:2px solid black">
            <div>
                <button on:click={()=>{deleteImageLink(i)}}>删除</button>
                <br>
                <div class="img-container">
                    <img src={link} alt={`Image ${i + 1}`}>
                </div>
            </div>
        </Cell>
    {/each}
</LayoutGrid>


<style>
    .img-container {
        height: 100%;
        display: flex;
        text-align: center;
        align-items: center;
    }

    .img-container img {
        max-height: 200px;
        height: auto;
        width: 100%;
    }

</style>


