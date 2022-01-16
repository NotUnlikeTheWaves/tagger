const  API_ENDPOINT = "http://localhost:8080/"

export interface ApiTag {
    Name: string;
    Hidden: boolean;

}

export const GetTags = (): ApiTag[] => {
    return [
        { Name: '#test', Hidden: false },
        { Name: '#another-test', Hidden: false },
        { Name: '#broo', Hidden: false },
    ]
}