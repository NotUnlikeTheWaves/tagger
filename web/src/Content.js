import React from 'react'
import {apiEndpoint, ApiAddTags, ApiDeleteTags, ApiGetContent} from './Api'
import EditTags from './EditTags'

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      docs: [],
      docsLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    this.loadContent()
  }

  loadContent() {
    console.log("loading content")
    const response = ApiGetContent(this.props.filters)
    response.then(
        (result) => {
          this.setState({
            docs: result,
            docsLoaded: true
          })
        },
        (error) => {
          this.setState({
            error: error
          })
        }
      )
  }

  componentDidUpdate(prevProps) {
    if(prevProps.filters !== this.props.filters) {
      this.loadContent()
    }
  }

  render() {
    if (this.state.docsLoaded === false) {
      return <div>There is no content yet!</div>
    } else {
      return (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            this.state.docs["files"].map((document, i) => {
              return (
                  <div key={document.Name}>
                    <div class="block border-solid rounded border-4 border-blue-600 hover:bg-opacity-100 bg-opacity-75 bg-gray-500 px-2 py-2">
                      <Document document={document} />
                    </div>
                  </div>
                  )
            })
          }
        </div>
      )
    }
  }
}

class Document extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      document: props.document
    }
  }

  addTag(tag) {
    const result = ApiAddTags(this.state.document, [tag])
    result.then(response => {
      if(response.ok === true) {
        response.json().then(newdoc => {
          this.setState({
            document: newdoc
          })
        })
      } else {
        console.log("Failed to add tag! Tag:")
        console.log(tag)
      }
    })
  }

  removeTag(tag) {
    const result = ApiDeleteTags(this.state.document, [tag])
    result.then(response => {
      if(response.ok === true) {
        response.json().then(newdoc => {
          this.setState({
            document: newdoc
          })
        })
      } else {
        console.log("Failed to delete tag! Tag:")
        console.log(tag)
      }
    })
  }


  RenderTagsInDocument() {
    const tags = this.state.document.Tags
    const RenderTag = (tag) => {
      const textColor = !tag.Hidden ? "text-white" : "text-blue-300"
      return <div class="px-1">
          <div class={"bg-black border rounded " + textColor + " hover:text-black hover:bg-white cursor-pointer px-1 py-1"}>
              #{tag.Name}
          </div>
      </div>
    }
    return (
        <div class={"flex flex-col items-left gap-2"}>
            <div class="flex flex-row flex-wrap mr-0 ">
                {
                    tags.filter(tag => tag.Hidden === false).map((tag, i) => {
                        return <div key={tag.Name}>{RenderTag(tag)}</div>
                    })
                }
            </div>
            <div class="flex flex-row flex-wrap">
                {
                    tags.filter(tag => tag.Hidden === true).map((tag, i) => {
                        return <div key={tag.Name}>{RenderTag(tag)}</div>
                    })
                }
            </div>
        </div>
    )
  }

  render() {
    return (
      <div class="flex flex-rows gap-2">
        <div class="w-2/3">
          {RenderDocument(this.state.document)}

          <div class="text-yellow-400 text-right underline truncate">
            {this.state.document.Name}
          </div>
        </div>
        {/* Place content between seems a bit hacky but gives me the result I want */}
        <div class="w-1/3 flex items-stretch place-content-between gap-2 border-l-4 border-blue-600 flex-col pl-2">
          <div class="">
          {
            this.RenderTagsInDocument()
          }
          </div>
          {
            <EditTags document={this.state.document}  addTag = {this.addTag.bind(this)} removeTag = {this.removeTag.bind(this)} />
          }
        </div>
      </div>)
  }
}
  
const RenderDocument = (document) => {
  switch(document.Type) {
    case "image": return (
      <img class="mx-auto" src={apiEndpoint + document.Url} alt={document.Name} />
    )
    case "video": return (
      <video class="mx-auto" src={apiEndpoint + document.Url} controls />
    )
    default: return (<a href={apiEndpoint + document.Url} target="_blank"><img class="mx-auto" src="/default-file-icon.svg" /></a>)
  }
  
}

export default Content
export {Content, Document, RenderDocument}
