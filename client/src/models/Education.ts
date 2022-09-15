export interface Education {
    count: number;
    rows:  EducationRow[];
}

export interface EducationRow {
    id:             number;
    education_name: string;
    createdAt:      string;
    updatedAt:      string;
    employeeId:     number;
}
