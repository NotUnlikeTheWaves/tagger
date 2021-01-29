import PreviousMap from 'postcss/lib/previous-map'
import React from 'react'


const apiEndpoint = "http://localhost:8080"

function Document(props) {
  return <div class="bg-gray-500">
    <img src={apiEndpoint + props.Url} alt={props.Name} />

    {props.Name}
  </div>
}

class Base extends React.Component {
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
      return <h1>Nothing yet!</h1>
    } else {
      return <div class="grid grid-cols-3 gap-4">{this.state.docs["files"].map((m, i) => {
        return <div key={i}>{Document(m)}</div>
      })}</div>
    }
  }
}

function App() {
  return <div class="bg-gray-600"><Base /></div>
}

export default App