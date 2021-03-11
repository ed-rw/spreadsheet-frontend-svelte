<script context="module">
	export async function preload(page, session) {
		const res = await this.fetch(`api/v1/spreadsheets`);
		const spreadsheets = await res.json();

		return { spreadsheets };
	}
</script>

<script>
	import successkid from 'images/successkid.jpg';
	import { Button, Col, Row, ListGroup, ListGroupItem } from 'sveltestrap/src';

	export let spreadsheets;
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
		<Button>Create New Spreadsheet</Button>
	</Col>
</Row>

<Row>
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
