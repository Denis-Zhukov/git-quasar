export interface Payload {
    usernameOrEmail: string;
    password: string;
}

export interface ResponseData {
    accessToken: string;
    user: {
        username: string;
        roles: string[];
    };
}
