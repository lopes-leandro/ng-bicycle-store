interface BaseModel {
    id: number;
    name: string;
    active: boolean;
}


export interface CategoryApiModel {
    id: number;
    description: string;
    image?: string;
    flag_active: boolean,
}

export interface CategoryView extends BaseModel { }
