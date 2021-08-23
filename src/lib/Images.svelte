<script>
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import {extractImages} from "./store";

    let images = extractImages.getLinks()
</script>

<LayoutGrid>
    {#each $images as link, i}
        <Cell span={2}>
            <div class="img-container">
                <img src={link} alt={`Image ${i + 1}`}>
            </div>
        </Cell>
    {/each}
</LayoutGrid>

<style>
    .img-container {
        height:100%;
        display: flex;
        text-align: center;
        align-items: center;
        /*vertical-align:middle;*/
        /*height: 100px;*/
        /*width: 150px;*/
    }

    .img-container img {
        height: auto;
        width: 100%;
    }

</style>


