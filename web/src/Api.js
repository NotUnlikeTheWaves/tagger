const apiEndpoint = "http://localhost:8080"

const AddTag = (document, tag) => {
    //"/api/v1/document/:fileName/tags"
    fetch(apiEndpoint = "/api/v1/document/" + document.Name + "/tags",
    {
        method: 'POST',
        body: [ JSON.stringify(tag) ]
    })
}


export {apiEndpoint}
export default apiEndpoint
