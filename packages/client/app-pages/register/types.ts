export interface RegisterPageProps {
    params: { locale: string };
}

export interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
