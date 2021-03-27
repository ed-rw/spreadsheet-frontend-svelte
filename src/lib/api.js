const base = import.meta.env.VITE_API_DOMAIN;

export async function getSpreadsheets() {
    const fetch =
        typeof window !== 'undefined'
            ? window.fetch
            : await import('node-fetch').then((mod) => mod.default);

    return fetch(`${base}/v1/spreadsheets`);
}

export async function getSpreadsheet(spreadsheetId) {
    const fetch =
        typeof window !== 'undefined'
            ? window.fetch
            : await import('node-fetch').then((mod) => mod.default);

    return fetch(`${base}/v1/spreadsheets/${spreadsheetId}`);
}

export async function createSpreadsheet(name) {
    const fetch =
        typeof window !== 'undefined'
            ? window.fetch
            : await import('node-fetch').then((mod) => mod.default);

    return fetch(`${base}/v1/spreadsheets`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': name
        })
    });
}

export async function getSpreadsheetCells(spreadsheetId) {
    const fetch =
        typeof window !== 'undefined'
            ? window.fetch
            : await import('node-fetch').then((mod) => mod.default);

    return fetch(`${base}/v1/spreadsheets/${spreadsheetId}/cells`);
}
