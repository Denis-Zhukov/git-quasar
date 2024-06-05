import { Response } from 'express';
import simpleGit from 'simple-git';

export const parseGitName = (repo: string) => {
    const locationOfGit = repo.lastIndexOf('.git');
    return repo.slice(0, locationOfGit > 0 ? locationOfGit : repo.length);
};

export const noCache = (res: Response) => {
    res.setHeader('expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
    res.setHeader('pragma', 'no-cache');
    res.setHeader('cache-control', 'no-cache, max-age=0, must-revalidate');
};

export const gitBlame = (gitdir: string, filepath: string, branch: string) => {
    return new Promise((resolve, reject) => {
        const git = simpleGit(gitdir);
        git.raw(['blame', filepath, '-b', branch], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};
