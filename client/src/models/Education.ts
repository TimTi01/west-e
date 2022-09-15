export interface Education {
    count: number;
    rows:  EducationRow[];
}

export interface EducationRow {
    id:             number;
    education_name: string;
}

export interface EducationReq {
    limit?: number, 
    page?: number, 
    education_name?: string
}