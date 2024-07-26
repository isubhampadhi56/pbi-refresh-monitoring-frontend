interface DatasetDetails{
    id: number,
    dataset_name: string,
    dataset_id: string
    dataset_url: string,
    refresh_status: string,
    refresh_start_time: string,
    last_refresh: string,
    refresh_frequency: string,
    last_refresh_duaration: string,
}

export type{
    DatasetDetails
}