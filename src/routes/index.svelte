<script context="module" lang="ts">
	import { getSpreadsheets, createSpreadsheet } from './_utils/backend';
	import type { Spreadsheet } from './_utisl/backend';

	export async function preload(page, session) {
		const getSpreadSheetsResp = await getSpreadsheets(this.fetch);
		const spreadsheets: Spreadsheet[] = await getSpreadSheetsResp.json();

		return { spreadsheets };
	}
</script>

<script lang="ts">
	import { Button, Col, Row, ListGroup, ListGroupItem, Input } from 'sveltestrap/src';

	export let spreadsheets: Spreadsheet[];
	export let newSpreadsheetName = '';

	async function newSpreadsheet() {

		const createSpreadSheetResp = await createSpreadsheet(fetch, newSpreadsheetName);

		// Fetch body, is this needed?
		await createSpreadSheetResp.json();

		newSpreadsheetName = '';

		// Reload spreadsheets data
		const reloadSpreadsheetsResp = await getSpreadsheets(fetch);
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
