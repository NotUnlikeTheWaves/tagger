import React from 'react'
import apiEndpoint from './Api'

class TagOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            filter: [],
            tagsLoaded: false,
            error: null
        }
        this.indexOfTagInFilter.bind(this)
    }

    componentDidMount() {
        console.log("hey")
        this.loadTagList()
    }

    loadTagList() {
        console.log("state in load-tag-list:")
        console.log(this.state.filter)
        var query = this.createFilterQuery()
        console.log("query is: " + query)
        fetch(apiEndpoint + "/api/v1/tagList" + query)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tags: result.tags,
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

    indexOfTagInFilter(tag) {
        return this.state.filter.findIndex(v => v.Hidden === tag.Hidden &&
            v.Name === tag.Name)
    }

    createFilterQuery() {
        if(this.state.filter.length > 0) {
            const parameters = this.state.filter.map(tag => "filter=" + (tag.Hidden ? 1 : 0) + "|" + tag.Name)
            const query = "?" + parameters.join('&')
            return query
        }
        return ""
    }

    empty() {
        console.log("state in empty function")
        console.log(this.state.filter)
    }

    switchFilter(tag) {
        const index = this.indexOfTagInFilter(tag)
        console.log("index is: " + index)
        console.log("index check:")
        console.log(this.state.filter)
        console.log("tag:")
        console.log(tag)
        console.log("------")
        if (index == -1) {
            const filter = this.state.filter.concat(tag)
            console.log("add filter:")
            console.log(filter)
            this.setState({
                filter: filter
            }, () => {this.loadTagList()})
        } else {
            const filter = this.state.filter
            filter.splice(index, 1)
            console.log("delete filter:")
            console.log(filter)
            this.setState({
                filter: filter
            }, () => {this.loadTagList()})
        }
    }

    render() {
        if(this.state.tagsLoaded === false) {
            return <div>There are no loaded tags yet!</div>
        } else {
            const tags = this.state.tags
            const RenderTag = (tag) => {
                const textColor = !tag.Hidden ? "text-white" : "text-blue-300"
                const underline = this.indexOfTagInFilter(tag) != -1 ? " underline " : ""
                return <div class="px-1">
                    <div
                        class={"bg-black border rounded " + textColor + underline + " hover:text-black hover:bg-white cursor-pointer px-1 py-1"}
                        onClick = {() => this.switchFilter(tag)}
                    >
                        #{tag.Name}
                    </div>
                </div>
            }

            // tags.filter(tag => tag.Hidden === false).map((tag, i) => {
            //     return <div key={i} onClick={() => deleteCallback(tag)}>{RenderTag(tag)}</div>
            // })

            return (
                <div class={"flex flex-col items-center gap-2"}>
                    <div class="flex flex-row flex-wrap mr-0 ">
                        {
                            tags.filter(tag => tag.Hidden === false).map((m, i) => {
                                return <div key={i}>{RenderTag(m)}</div>
                            })
                        }
                    </div>
                    <div class="flex flex-row flex-wrap">
                        {
                            tags.filter(tag => tag.Hidden === true).map((m, i) => {
                                return <div key={i}>{RenderTag(m)}</div>
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}



export default TagOverview
export {TagOverview}
