import * as layout from "../../../src/routes/$layout.svelte";

const components = [
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/spreadsheets/[spreadsheetId].svelte")
];

const d = decodeURIComponent;
const empty = () => ({});

export const routes = [
	// src/routes/index.svelte
[/^\/$/, [components[0]]],

// src/routes/spreadsheets/[spreadsheetId].svelte
[/^\/spreadsheets\/([^/]+?)\/?$/, [components[1]], (m) => ({ spreadsheetId: d(m[1])})]
];

export { layout };