export type StatisticsAccountCreateResponse = {
    month: string;
    count: number;
}[];

export interface StatisticCommitsData {
    username: string;
    repository: string;
}

export interface StatisticCommitsResponse {
    message: string;
    statistic: { [key: string]: number };
}
