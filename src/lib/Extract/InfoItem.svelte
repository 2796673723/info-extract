<script>
    export let attribute;
    export let value;
    import {extractInfo} from "../store";

    function update() {
        extractInfo.put(attribute, value)
    }

    function deleteValue() {
        extractInfo.delete(attribute)
    }

</script>

<tr>
    <td><input type="text" bind:value={attribute}></td>
    <td><input type="text" bind:value={value}></td>
    <td><button on:click={update}>更新</button></td>
    <td><button on:click={deleteValue}>删除</button></td>
</tr>