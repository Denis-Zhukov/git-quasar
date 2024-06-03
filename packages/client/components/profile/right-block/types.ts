export interface RightBlockProps {
    bio: string;
    username: string;
    favorites: {
        createdAt: string;
        id: string;
        name: string;
        private: boolean;
    }[];
}
