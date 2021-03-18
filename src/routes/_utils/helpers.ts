
export function intToCol(colNdx: integer): string | null {
    if (colNdx == 0) {
        return null;
    }

    let chars: string[] = [];

    while (colNdx > 0) {
        let d = colNdx % 26;
        colNdx = Math.floor(colNdx/26);

        if (d == 0) {
            colNdx = colNdx - 1;
            d = d + 26;
        }
        const asciiDecimal = d + 64;
        chars.push(String.fromCharCode(asciiDecimal));
    }

    let ret = chars.reverse().join('');
    return ret;
}
