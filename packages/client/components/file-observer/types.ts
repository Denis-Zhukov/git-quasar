export interface FileObserverProps {
    content: string;
    path: string;
    blame: boolean;
    onClickBlame: (path: string) => () => void;
}
