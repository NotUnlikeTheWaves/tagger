import React from 'react'
import apiEndpoint from './Api'

class TagOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            tagsLoaded: false,
            error: null
        }
    }

    componentDidMount() {
        fetch(apiEndpoint + "/api/v1/tagList")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tags: result,
                        tagsLoaded: true
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
        if(this.state.tagsLoaded === false) {
            return <div class="w-9/12 grid grid-cols-3 gap-4 py-10">There is no content yet!</div>
        } else {
            return <div class="flex flex-wrap items-right">
                {
                    this.state.tags["tags"].map((m, i) => {
                        return <div key={i}>{RenderTag(m)}</div>
                    })
                }
            </div>
        }
    }
}

function RenderTag(tag) {
    return <div class="px-1">
        <div class="bg-black border rounded text-white hover:text-black hover:bg-white cursor-pointer px-1 py-1">
            #{tag}
        </div>
    </div>
}

export default TagOverview