import type { ResultStats } from './enum';

export interface Result<T = unknown> {
    status: ResultStats;
    data: T;
    message: string;
}
