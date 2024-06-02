interface FileSystemItem {
    name: string;
    type: 'file' | 'folder';
}

export const getFilesOnCurrentLevel = (
    paths: string[],
    path: string,
): FileSystemItem[] => {
    const normalizedPath =
        path === '' || path === '.' ? '' : path.replace(/^[./]\/?/, '') + '/';
    const itemsInDirectory = new Map<string, FileSystemItem>();

    paths.forEach((p) => {
        if (normalizedPath === '') {
            const firstPart = p.split('/')[0];
            const type = firstPart.includes('.') ? 'file' : 'folder';
            itemsInDirectory.set(firstPart, { name: firstPart, type });
        } else if (p.startsWith(normalizedPath)) {
            const relativePath = p.slice(normalizedPath.length);
            const firstPart = relativePath.split('/')[0];
            const type = relativePath.includes('/') ? 'folder' : 'file';
            itemsInDirectory.set(firstPart, { name: firstPart, type });
        }
    });

    return Array.from(itemsInDirectory.values());
};
