const apiEndpoint = "http://localhost:8080"

async function ApiAddTags(document, tags) {
    //"/api/v1/document/:fileName/tags"
    const response = await fetch(apiEndpoint + "/api/v1/document/" + document.Name + "/tags",
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tags)
    })
    return response
}
async function ApiDeleteTags(document, tags) {
    //"/api/v1/document/:fileName/tags"
    const response = await fetch(apiEndpoint + "/api/v1/document/" + document.Name + "/tags",
    {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tags)
    })
    return response
}

async function ApiGetTags(filters) {

    const query = createFilterQuery(filters)
    const response = fetch(apiEndpoint + "/api/v1/tagList" + query)
        .then(res => res.json())
    return response
}

async function ApiGetContent(filters) {
    const query = createFilterQuery(filters)
    const response = fetch(apiEndpoint + "/api/v1/contentList" + query)
      .then(res => res.json())
    return response
}


function createFilterQuery(filters) {
    if(filters.length > 0) {
        const parameters = filters.map(tag => "filter=" + (tag.Hidden ? 1 : 0) + "|" + tag.Name)
        const query = "?" + parameters.join('&')
        return query
    }
    return ""
  }

export {apiEndpoint, ApiAddTags, ApiDeleteTags, ApiGetTags, ApiGetContent}
export default apiEndpoint
