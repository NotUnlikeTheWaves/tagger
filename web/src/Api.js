const apiEndpoint = "http://localhost:8080"

async function ApiAddTags(document, tags) {
    //"/api/v1/document/:fileName/tags"
    const response = await fetch(apiEndpoint + "/api/v1/document/" + document.Name + "/tags",
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tags)
    })
    return response.ok
}


export {apiEndpoint, ApiAddTags}
export default apiEndpoint
