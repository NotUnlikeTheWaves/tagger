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
    this.addTag.bind(this)
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

  addTag(event) {
    event.preventDefault();
    console.log("AddTag event")
    console.log(event)
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
                      <Document document={document} isEdit={false} addTag={this.addTag} />
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

const Document = (props) => {
  console.log("lul:")
  console.log(props.addTag)
  return (
    <div class="flex flex-rows gap-2">
      <div class="w-2/3">
        {RenderDocument(props.document)}

        <div class="text-yellow-400 text-right underline">
          {props.document.Name}
        </div>
      </div>
      {/* Place content between seems a bit hacky but gives me the result I want */}
      <div class="w-1/3 flex items-stretch place-content-between gap-2 border-l-4 border-blue-600 flex-col pl-2">
        <div class="">
        {
          RenderTagList(props.document.Tags, false)
        }
        </div>
        {
          <EditTags document={props.document}  addTag = {props.addTag} />
        }
      </div>
    </div>)
}
  
const RenderDocument = (document) => {
  return <img class="mx-auto" src={apiEndpoint + document.Url} alt={document.Name} />
}

export default Content
export {Content, Document, RenderDocument}
