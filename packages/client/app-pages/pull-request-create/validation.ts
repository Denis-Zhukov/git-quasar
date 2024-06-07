import { object, ref, string } from 'yup';

export const pullRequestSchema = object().shape({
    source: string().required('Source is required'),
    destination: string()
        .required('Destination is required')
        .notOneOf([ref('source')], 'Source and destination cannot be the same'),
});
