interface FileSystemItem {
    name: string;
    type: 'file' | 'folder';
}

function normalizePath(path: string): string {
    return path.replace(/^\.\//, '').replace(/^\.$/, '');
}

export const getFilesOnCurrentLevel = (
    paths: string[],
    path: string,
): FileSystemItem[] => {
    const normalizedPath = normalizePath(path);
    const pathPrefix = normalizedPath ? normalizedPath + '/' : '';

    const result: FileSystemItem[] = [];
    const seenItems = new Set<string>();
    const folders = new Set<string>();

    paths.forEach((fullPath) => {
        if (fullPath.startsWith(pathPrefix)) {
            const relativePath = fullPath.slice(pathPrefix.length);
            const [item] = relativePath.split('/');

            if (item) {
                if (relativePath.includes('/')) {
                    folders.add(item);
                }
                if (!seenItems.has(item)) {
                    seenItems.add(item);
                    result.push({
                        name: item,
                        type: folders.has(item) ? 'folder' : 'file',
                    });
                }
            }
        }
    });

    result.forEach((item) => {
        if (folders.has(item.name)) {
            item.type = 'folder';
        }
    });

    return result;
};
