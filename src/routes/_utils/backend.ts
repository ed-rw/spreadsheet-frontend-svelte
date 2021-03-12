
export interface Spreadsheet {
    name: string,
    id: string
}

export interface SpreadsheetCell {
    name: string,
    data: {
        type: string,
        value: string
    }
}

export function getSpreadsheets(
    fetch: (url: string, options?: any) => any
) {
    return fetch(`api/v1/spreadsheets`);
}

export function getSpreadsheet(
    fetch: (url: string, options?: any)  => any, spreadsheetId: string
) {
    return fetch(`api/v1/spreadsheets/${spreadsheetId}`);
}

export function createSpreadsheet(
    fetch: (url: string, options?: any)  => any, name: string
) {
    return fetch('/api/v1/spreadsheets', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': name
        })
    });
}

export function getSpreadsheetCells(
    fetch: (url: string, options?: any)  => any, spreadsheetId: string
) {
    return fetch(`api/v1/spreadsheets/${spreadsheetId}/cells`);
}
