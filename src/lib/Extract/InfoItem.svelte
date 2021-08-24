<script>
    export let attribute;
    export let value;
    export let previousAttribute;

    import {extractInfo} from "../store";


    function update() {
        if (previousAttribute === attribute) {
            extractInfo.put(attribute, value)
        } else {
            extractInfo.delete(previousAttribute)
            extractInfo.put(attribute, value)
        }
    }

    function deleteValue() {
        extractInfo.delete(attribute)
    }

</script>

<tr>
    <td>{previousAttribute}</td>
    <td><input type="text" bind:value={attribute}></td>
    <td><input type="text" bind:value={value}></td>
    <td>
        <button on:click={update}>更新</button>
    </td>
    <td>
        <button on:click={deleteValue}>删除</button>
    </td>
</tr>