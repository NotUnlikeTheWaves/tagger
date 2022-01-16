const  API_ENDPOINT = "http://localhost:8080/"

export interface ApiTag {
    name: string;
    hidden: boolean;

}

export const GetTags = (): ApiTag[] => {
    return [
        { name: '#test', hidden: false },
        { name: '#another-test', hidden: false },
        { name: '#broo', hidden: false },
    ]
}