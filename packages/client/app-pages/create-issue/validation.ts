import { object, string } from 'yup';

export const createIssueSchema = object({
    title: string().required('Обазязательно для заполнения'),
    question: string().required('Опишите ваш вопрос'),
});
