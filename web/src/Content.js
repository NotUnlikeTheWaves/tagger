import React from 'react'
import apiEndpoint from './Api'
import { RenderTag } from './Tags'

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
        return <div class="grid grid-cols-3 gap-4">
              {
                this.state.docs["files"].map((m, i) => {
                  return <div key={i}>{Document(m)}</div>
                })
              }
            </div>
      }
    }
  }

  const Document = (props) => {
    return <div class="block border-solid border-4 border-blue-500 hover:bg-yellow-500 bg-red-500  px-2 py-2">
      <div class="flex flex-rows space-x-400">
        <div>
          <img src={apiEndpoint + props.Url} alt={props.Name} />
      
          <div class="text-yellow-400 text-right">
            {props.Name}
          </div>
        </div>
        <div class="flex">
          {
              props.Tags.map((m, i) => {
                          // return m.Name
                            return <div key={i}>{RenderTag(m)}</div>
                        })
                      
            // RenderTag({Name: "hey", Hidden: false})
          }
        </div>
      </div>
    </div>
  }
  

export default Content