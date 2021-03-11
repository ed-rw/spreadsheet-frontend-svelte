<script context="module">
	export async function preload(page, session) {
		const createSpreadSheetResp = await this.fetch(`api/v1/spreadsheets`);
		const spreadsheets = await createSpreadSheetResp.json();

		return { spreadsheets };
	}
</script>

<script lang="ts">
	import successkid from 'images/successkid.jpg';
	import { Button, Col, Row, ListGroup, ListGroupItem, Input } from 'sveltestrap/src';

	export let spreadsheets;
	export let newSpreadsheetName = '';

	async function createSpreadsheet() {

		const createSpreadSheetResp = await fetch('/api/v1/spreadsheets', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'name': newSpreadsheetName
			})
		});

		// Fetch body, is this needed?
		await createSpreadSheetResp.json();

		newSpreadsheetName = '';

		// Reload spreadsheets data
		const reloadSpreadsheetsResp = await fetch(`/api/v1/spreadsheets`);
		spreadsheets = await reloadSpreadsheetsResp.json();
	}
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Spreadsheets</title>
</svelte:head>

<Row>
	<Col>
		<Input type="text" bind:value={newSpreadsheetName} placeholder="spreadsheet name" />
	</Col>
	<Col>
		<Button color="primary" disabled={!newSpreadsheetName} on:click="{createSpreadsheet}">Create New Spreadsheet</Button>
	</Col>
</Row>

<Row style="padding-top: 50px">
	<Col>
		<ListGroup>
			{#each spreadsheets as spreadsheet}
			<ListGroupItem>
				{spreadsheet.name}
			</ListGroupItem>
			{/each}
		</ListGroup>
	</Col>
</Row>
