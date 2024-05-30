import { Response } from 'express';

export const parseGitName = (repo: string) => {
    const locationOfGit = repo.lastIndexOf('.git');
    return repo.slice(0, locationOfGit > 0 ? locationOfGit : repo.length);
};

export const noCache = (res: Response) => {
    res.setHeader('expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
    res.setHeader('pragma', 'no-cache');
    res.setHeader('cache-control', 'no-cache, max-age=0, must-revalidate');
};
