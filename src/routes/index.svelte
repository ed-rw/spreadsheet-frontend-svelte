<script context="module">
	import { getSpreadsheets, createSpreadsheet } from '$lib/api';

	export async function load({ page, fetch, session, context }) {
		const getSpreadSheetsResp = await getSpreadsheets();
		const spreadsheets = await getSpreadSheetsResp.json();

		return { props: { spreadsheets } };
	}
</script>

<script>
	import { Button, Col, Row, ListGroup, ListGroupItem, Input } from 'sveltestrap/src';

	export let spreadsheets;
	export let newSpreadsheetName = '';

	async function newSpreadsheet() {

		const createSpreadSheetResp = await createSpreadsheet(newSpreadsheetName);

		// Fetch body, is this needed?
		await createSpreadSheetResp.json();

		newSpreadsheetName = '';

		// Reload spreadsheets data
		const reloadSpreadsheetsResp = await getSpreadsheets();
		spreadsheets = await reloadSpreadsheetsResp.json();
	}
</script>


<svelte:head>
	<title>Spreadsheets</title>
</svelte:head>

<Row>
	<Col>
		<Input type="text" bind:value={newSpreadsheetName} placeholder="spreadsheet name" />
	</Col>
	<Col>
		<Button color="primary" disabled={!newSpreadsheetName}
				on:click="{newSpreadsheet}">Create New Spreadsheet</Button>
	</Col>
</Row>

<Row style="padding-top: 50px">
	<Col>
		<ListGroup>
			{#each spreadsheets as spreadsheet}
			<ListGroupItem>
				<a href="spreadsheets/{spreadsheet.id}">{spreadsheet.name}</a>
			</ListGroupItem>
			{/each}
		</ListGroup>
	</Col>
</Row>
