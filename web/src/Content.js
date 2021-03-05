import React from 'react'
import apiEndpoint from './Api'

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
        return <div class="w-9/12 grid grid-cols-3 gap-4">There is no content yet!</div>
      } else {
        return <div class="w-9/12 grid grid-cols-3 gap-4">
              {
                this.state.docs["files"].map((m, i) => {
                  return <div key={i}>{Document(m)}</div>
                })
              }
            </div>
      }
    }
  }

  function Document(props) {
    return <div class="block border-solid border-4 border-blue-500 hover:bg-yellow-500 bg-red-500 px-2 py-2">
      <img src={apiEndpoint + props.Url} alt={props.Name} />
  
      <div class="text-yellow-400 text-right">
        {props.Name}
      </div>
    </div>
  }
  

export default Content