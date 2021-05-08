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

async function ApiUploadFiles(files, callback) {
    console.log("trying to upload")
    var xhr = new XMLHttpRequest()
    var formData = new FormData()

    xhr.onreadystatechange = function() {
        console.log("state change")
        console.log(this)
        if(this.readyState == 4) {
            callback({
                success: this.status === 200
            })
        }
    }

    xhr.open("POST", apiEndpoint + "/api/v1/document")
    console.log("opened XHR")
    files.forEach(file => {
        formData.append("file[]", file)
    })
    console.log("fd:")
    console.log(formData)
    console.log("sending xhr")
    xhr.send(formData)

    console.log("sent XHR")
}

function createFilterQuery(filters) {
    if(filters.length > 0) {
        const parameters = filters.map(tag => "filter=" + (tag.Hidden ? 1 : 0) + "|" + tag.Name)
        const query = "?" + parameters.join('&')
        return query
    }
    return ""
  }

  // remove apiEndpoint from this!
export {apiEndpoint, ApiAddTags, ApiDeleteTags, ApiGetTags, ApiGetContent, ApiUploadFiles}
export default apiEndpoint
