<script>
    import {extractInfo} from "./store";

    const info = extractInfo.getJson();

    function test() {
        console.log($info)
    }

    function test2() {
        extractInfo.put("测试", 12345)
    }

    function test3() {
        extractInfo.delete("测试")
    }

</script>

<button on:click={test}>测试1</button>
<button on:click={test2}>测试2</button>
<button on:click={test3}>测试3</button>