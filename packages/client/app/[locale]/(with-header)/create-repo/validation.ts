import { boolean, object, string } from 'yup';

export const createRepoSchema = object({
    repoName: string().required(),
    privateRepo: boolean().required(),
});
