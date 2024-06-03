export interface ProfileProps {
    username: string;
}

export interface ProfileForm {
    avatar: File | null;
    username: string;
    name: string;
    surname: string;
    bio: string;
    currentUsername: string;
}
