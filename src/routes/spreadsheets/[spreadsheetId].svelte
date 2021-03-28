<script context="module" lang="ts">
    import { getSpreadsheet, getSpreadsheetCells } from '../_utils/backend';
    import { intToCol } from '../_utils/helpers';
    import type { Spreadsheet, SpreadsheetCell, SpreadsheetCellData } from '../_utils/backend';

    export async function preload(page, session) {

        // TODO: should probably allow limiting the range of cells initially
        // retrieved
        const [getSpreadsheetResp, getSpreadsheetCellsResp] = await Promise.all(
            [getSpreadsheet(this.fetch, page.params.spreadsheetId),
             getSpreadsheetCells(this.fetch, page.params.spreadsheetId)]
        );

        const spreadsheet: Spreadsheet = await getSpreadsheetResp.json();
        const spreadsheetCellsList: SpreadsheetCell[] = await getSpreadsheetCellsResp.json();

        const spreadsheetCells: Map<string, SpreadsheetCellData> = spreadsheetCellsList.reduce(
            (acc, e) => acc.set(e.name, e.data),
            new Map()
        );

        return { spreadsheet, spreadsheetCells };
    }
</script>

<script lang="ts">
    import { Col, Row, Table } from 'sveltestrap/src';
    import Cell from '../../components/Cell.svelte';
    import { updateCell } from '../_utils/backend';
    export let spreadsheet: Spreadsheet;
    export let spreadsheetCells: Map<string, SpreadsheetCellData>;

    export let colStart = 1; // Columnns are one based, but want one for row
    export let colEnd = 10;
    export let rowStart = 1; // Rows are one based
    export let rowEnd = 10;
    let currentInputCell = null;

    let emptyCell: SpreadsheetCellData = {value: "", type: "empty"}

    export function getCellName(colDisplayNdx: integer, rowDisplayNdx: integer): string {
        let col = intToCol(colStart + colDisplayNdx);
        let row = rowStart + rowDisplayNdx;
        return col + row;
    }

    export function getCellData(cellName): SpreadsheetCellData {
        return ;
    }

    export function updateCellCallback(event) {
        spreadsheetCells.set(event.detail.cellName, event.detail.cellData);
        // This makes the statement above reactive, it tells svelte that
        // anywhere spreadsheetCells has been used needs to be recomputed
        // it does cause all Cell components to be updated, which is not
        // as efficient as it could be
        spreadsheetCells = spreadsheetCells;
        updateCell(fetch, spreadsheet.id, event.detail.cellName,
                   event.detail.cellData)
            .then(() => console.log("cell updated"));
    }

</script>

<svelte:head>
    <title>{spreadsheet.name}</title>
</svelte:head>

<Row>
    <Col>
        <h1>{spreadsheet.name}</h1>
        <Table>
            <thead>
                <tr>
                    <th></th>
                    {#each {length: colEnd - colStart} as _, colNdx}
                    <th>{intToCol(colStart + colNdx)}</th>
                    {/each}
                </tr>
            </thead>
            {#each {length: rowEnd - rowStart} as _, rowNdx}
            <tr>
                <td>{rowStart + rowNdx}</td>
                {#each {length: colEnd - colStart} as _, colNdx}
                <td on:click={() => currentInputCell = getCellName(colNdx, rowNdx)}>
                    <Cell cellName={getCellName(colNdx, rowNdx)}
                          cellData={spreadsheetCells.get(getCellName(colNdx, rowNdx)) || emptyCell}
                          showInput={currentInputCell === getCellName(colNdx, rowNdx)}
                          on:cellUpdate={updateCellCallback} />
                </td>
                {/each}
            </tr>
            {/each}
        </Table>
    </Col>
</Row>
