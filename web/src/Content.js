import React from 'react'
import apiEndpoint from './Api'
import { RenderTag } from './Tags'
import Modal from './Modal'

class Content extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        docs: [],
        docsLoaded: false,
        error: null
      }
    }
  
    componentDidMount(){
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
              this.state.docs["files"].map((m, i) => {
                return <div key={i}>{Document(m)}</div>
              })
            }
          </div>
        )
      }
    }
  }

  const Document = (props) => {
    return <div class="block border-solid rounded border-4 border-blue-600 hover:bg-yellow-500 bg-gray-500 px-2 py-2">
      <div class="flex flex-rows gap-2">
        <div class="w-2/3">
          <img class="mx-auto" src={apiEndpoint + props.Url} alt={props.Name} />
      
          <div class="text-yellow-400 text-right underline">
            {props.Name}
          </div>
        </div>
        {/* Place content between seems a bit hacky but gives me the result I want */}
        <div class="flex items-stretch place-content-between gap-2 border-l border-blue-600 flex-col pl-2">
          <div class="flex flex-row">
          {
              props.Tags.filter(m => m.Hidden == false).map((m, i) => {
                          // return m.Name
                            return <div key={i}>{RenderTag(m)}</div>
                        })
          }
          </div>
          <div class="flex flex-row">
          {
              props.Tags.filter(m => m.Hidden == true).map((m, i) => {
                          // return m.Name
                            return <div key={i}>{RenderTag(m)}</div>
                        })
          }
          </div>
          <div class="">
          <Modal />
          </div>
        </div>
      </div>
    </div>
  }
  

export default Content