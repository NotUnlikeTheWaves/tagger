const  API_ENDPOINT = "http://localhost:8080/"
import { ApiTag } from './tags'

// Name         string
// Size         int64
// Url          string
// Type         string
// Tags         []Tag
// DateCreated  time.Time
// DateModified time.Time

export interface ApiDocument {
    Name: string;
    Size: number;
    Url: string;
    Type: string;
    Tags: ApiTag[];
    DateCreated: Date;
    DateModified: Date;
}

export interface ApiResponse {
    files: ApiDocument[]
}

export async function GetDocuments(): Promise<ApiDocument[]> {
    const response: Promise<ApiResponse> = fetch(API_ENDPOINT + "api/v1/contentList")
        .then(res => res.json())
    return (await response).files;
}