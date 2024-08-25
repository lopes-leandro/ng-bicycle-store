interface BaseModel {
    id: number;
    name: string;
}

export interface CategoryApiModel {
    id: number;
    description: string;
}

export interface CategoryView extends BaseModel { }
