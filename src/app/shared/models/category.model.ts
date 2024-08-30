export interface Category {
    id: string;
    name: string;
    active: boolean;
    image?: string;
}

export interface CategoryApi {
    id: string;
    description: string;
    flag_active: boolean,
    image?: string;
}