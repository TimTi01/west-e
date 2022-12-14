import { EducationRow } from "./Education";
import { PostRow } from "./Post";

export interface Employee {
    count: number;
    rows:  EmployeeRow[];
}

export interface EmployeeReq {
    limit?: number, 
    page?: number, 
    full_name?: string
}

export interface EmployeeRow {
    id:        number;
    full_name: string;
    post:     PostRow;
    education: EducationRow;
}

export interface EmployeeEdit {
    id: number
    full_name: string
    postId: number 
    educationId: number
}