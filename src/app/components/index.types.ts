export type FormTypes = {
    id?: number
    title: string,
    severity: 'high' | 'low' | 'medium',
    time: string,
    status: boolean,
}