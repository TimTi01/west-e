export interface Post {
    count: number;
    rows:  PostRow[];
}

export interface PostRow {
    id:         number;
    post_name:  string;
}

export interface PostReq {
    limit?: number, 
    page?: number, 
    post_name?: string
}