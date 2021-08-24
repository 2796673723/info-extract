<script>
    import {DialogOverlay, DialogContent} from 'svelte-accessible-dialog';

    export let addAttribute;

    let isOpen = false;
    let open = () => isOpen = true;
    let close = () => [isOpen, key, value] = [false, "", ""];


    let key = ""
    let value = ""
</script>

<button on:click={open}>添加属性</button>

<DialogOverlay {isOpen} onDismiss={close}>
    <DialogContent aria-label="Announcement">
        <label> 属性：<input type="text" bind:value={key}> </label><br>
        <label> 数值：<input type="text" bind:value={value}> </label><br>
        <button on:click={()=>{addAttribute(key,value);close();}}>确定</button>
    </DialogContent>
</DialogOverlay>
