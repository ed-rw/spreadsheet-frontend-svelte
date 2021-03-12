<script context="module" lang="ts">
    import { getSpreadsheet, getSpreadsheetCells } from '../_utils/backend';
    import type { Spreadsheet, SpreadsheetCell } from '../_utils/backend';

    export async function preload(page, session) {

        const [getSpreadsheetResp, getSpreadsheetCellsResp] = await Promise.all(
            [getSpreadsheet(this.fetch, page.params.spreadsheetId),
             getSpreadsheetCells(this.fetch, page.params.spreadsheetId)]
        );

        const spreadsheet: Spreadsheet = await getSpreadsheetResp.json();
        const spreadsheetCells: SpreadsheetCell[] = await getSpreadsheetCellsResp.json();

        return { spreadsheet, spreadsheetCells };
    }
</script>

<script lang="ts">
import { Col, Row } from 'sveltestrap/src';
    export let spreadsheet: Spreadsheet;
    //export let spreadsheetCells: SpreadsheetCell[];


</script>

<svelte:head>
    <title>{spreadsheet.name}</title>
</svelte:head>

<Row>
    <Col>
        <h1>{spreadsheet.name}</h1>
    </Col>
</Row>
