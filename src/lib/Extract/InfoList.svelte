<script>
    import {extractInfo} from "../store";
    import InfoItem from "./InfoItem.svelte";

    let info = extractInfo.getJson()
</script>

<table>
    <!--    <tr>-->
    <!--        <th>属性</th>-->
    <!--        <th>数值</th>-->
    <!--    </tr>-->
    {#each Object.entries($info) as [attribute, value],index (index)}
        <InfoItem {...{previousAttribute: attribute, attribute, value}}/>
    {/each}
</table>