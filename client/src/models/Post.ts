export interface Post {
    count: number;
    rows:  PostRow[];
}

export interface PostRow {
    id:         number;
    post_name:  string;
    createdAt:  string;
    updatedAt:  string;
    employeeId: number;
}
