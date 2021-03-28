<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let cellName;
    export let cellData;
    export let showInput = false;

    function handleCellInput(e) {
        //TODO add debounce
        let value = e.target.value;

        dispatch('cellUpdate', {
            "cellName": cellName,
            "cellData": {"value": value, "type": 'literal'}
        });
    }

</script>

<div>
    {#if showInput}
        <input type="text"
               value={cellData.value}
               on:input={handleCellInput}
               on:click|stopPropagation
               on:keydown={(e) => {if (e.keyCode == 13) {showInput = !showInput}}} />
    {:else}
        <span class="cellDataDisplay">{cellData.value}</span>
    {/if}

</div>
