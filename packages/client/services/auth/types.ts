export interface Payload {
    usernameOrEmail: string;
    password: string;
}

export interface ResponseData {
    accessToken: string;
    user: {
        id: string;
        username: string;
        roles: string[];
        avatar: string;
    };
}
