export interface LoginPageProps {
    params: { locale: string };
}

export interface LoginForm {
    usernameOrEmail: string;
    password: string;
}
