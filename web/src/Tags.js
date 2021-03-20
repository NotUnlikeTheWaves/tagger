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
            return <div>There are no loaded tags yet!</div>
        } else {
            return (
            <div class="flex flex-col items-center gap-2">
                <div class="flex flex-row">
                    {
                        this.state.tags["tags"].filter(tag => tag.Hidden == false).map((m, i) => {
                            return <div key={i}>{RenderTag(m)}</div>
                        })
                    }
                </div>
                <div class="flex flex-row">
                    {
                        this.state.tags["tags"].filter(tag => tag.Hidden == true).map((m, i) => {
                            return <div key={i}>{RenderTag(m)}</div>
                        })
                    }
                </div>
            </div>
            )
        }
    }
}

const RenderTag = (tag) => {
    const textColor = !tag.Hidden ? "text-white" : "text-blue-300"
    return <div class="px-1">
        <div class={"bg-black border rounded " + textColor + " hover:text-black hover:bg-white cursor-pointer px-1 py-1"}>
            #{tag.Name}
        </div>
    </div>
}

export default TagOverview
export {TagOverview, RenderTag}