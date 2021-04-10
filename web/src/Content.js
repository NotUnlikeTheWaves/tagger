import React from 'react'
import {apiEndpoint} from './Api'
import { RenderTagList } from './Tags'
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
    fetch(apiEndpoint + "/api/v1/contentList")
      .then(res => res.json())
      .then(
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

  render() {
    if (this.state.docsLoaded === false) {
      return <div>There is no content yet!</div>
    } else {
      return (
        <div class="grid grid-cols-3 gap-4">
          {
            this.state.docs["files"].map((document, i) => {
              return (
                  <div key={i}>
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
    console.log("props")
    console.log(props)
    this.state = {
      document: props.document
    }
    this.addTag.bind(this)
    this.addTag.bind(this)
  }

  addTag(tag) {

  }

  removeTag(tag) {

  }

  render() {
    console.log("doc:")
    console.log(this.state.document)
    // return "hi";
    return (
      <div class="flex flex-rows gap-2">
        <div class="w-2/3">
          {RenderDocument(this.state.document)}

          <div class="text-yellow-400 text-right underline">
            {this.state.document.Name}
          </div>
        </div>
        {/* Place content between seems a bit hacky but gives me the result I want */}
        <div class="w-1/3 flex items-stretch place-content-between gap-2 border-l-4 border-blue-600 flex-col pl-2">
          <div class="">
          {
            RenderTagList(this.state.document.Tags, false)
          }
          </div>
          {
            <EditTags document={this.state.document}  addTag = {this.addTag} />
          }
        </div>
      </div>)
  }
}
  
const RenderDocument = (document) => {
  return <img class="mx-auto" src={apiEndpoint + document.Url} alt={document.Name} />
}

export default Content
export {Content, Document, RenderDocument}
