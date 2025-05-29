export type Vote = {
    id: number;
    image_id: string;
    sub_id: string;
    created_at: string;
    value: number;
    country_code: string | null;
    image: {
        id: string;
        url: string;
    };
}

export type PartialVote = Partial<Vote>;