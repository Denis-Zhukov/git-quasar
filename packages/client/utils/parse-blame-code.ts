export const parseCode = (text: string | undefined, blame: boolean) => {
    if (!text) return { authors: '', code: '' };

    const lines = text.split('\n');
    if (!blame)
        return { authors: lines.map((_, i) => `${i + 1})\n`), code: text };

    let left = '';
    let right = '';

    lines.forEach((line) => {
        const index = line.indexOf(')') + 1;
        if (index > 0) {
            left += line.substring(0, index).trim() + '\n';
            right += line.substring(index) + '\n';
        }
    });

    return { authors: left.trim(), code: right.trimEnd() };
};
