interface Error {
    message: string;
}

export const isError = (error: any): error is Error => {
    if (!error) return false;
    return 'message' in error;
};
