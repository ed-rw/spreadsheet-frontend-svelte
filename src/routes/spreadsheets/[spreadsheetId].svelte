<script context="module">
    import { getSpreadsheet, getSpreadsheetCells } from '$lib/api';
    import { intToCol } from '$lib/helpers';

    export async function load({ page, fetch, session, context }) {

        // TODO: should probably allow limiting the range of cells initially
        // retrieved
        const [getSpreadsheetResp, getSpreadsheetCellsResp] = await Promise.all(
            [getSpreadsheet(page.params.spreadsheetId),
             getSpreadsheetCells(page.params.spreadsheetId)]
        );

        const spreadsheet = await getSpreadsheetResp.json();
        const spreadsheetCellsList = await getSpreadsheetCellsResp.json();

        const spreadsheetCells= spreadsheetCellsList.reduce(
            (acc, e) => acc.set(e.name, e.data),
            new Map()
        );

        return { props: { spreadsheet, spreadsheetCells } };
    }
</script>

<script>
    import { Col, Row, Table } from 'sveltestrap';
    export let spreadsheet;
    export let spreadsheetCells;

    export let colStart = 1; // Columnns are one based, but want one for row
    export let colEnd = 10;
    export let rowStart = 1; // Rows are one based
    export let rowEnd = 10;

    let emptyCell = {value: "", type: "empty"}

    export function getCellData(colDisplayNdx, rowDisplayNdx) {
        let col = intToCol(colStart + colDisplayNdx);
        let row = rowStart + rowDisplayNdx;

        return spreadsheetCells.get(col + row) || emptyCell;
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
                <td>{getCellData(colNdx, rowNdx).value}</td>
                {/each}
            </tr>
            {/each}
        </Table>
    </Col>
</Row>
