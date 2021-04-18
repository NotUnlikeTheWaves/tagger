import React from 'react'
import {ApiGetTags} from './Api'

class TagOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            applicableTags: [],
            filter: [],
            tagsLoaded: false,
            error: null
        }
    }

    componentDidMount() {
        (async () => {
            await this.loadTags()
            this.setState({
                tags: this.state.applicableTags,
                tagsLoaded: true
            })
        })();
    }

    async loadTags() {
        // [...var] because react is a special type of moronic
        this.props.setFilters([...this.state.filter])
        const response = ApiGetTags(this.state.filter)
        await response.then(
            (result) => {
                this.setState({
                    applicableTags: result.tags
                })
            },
            (error) => {
                this.setState({
                    error: error
                })
            }
        )
    }

    indexOfTagInTagList(tag, list) {
        return list.findIndex(v => v.Hidden === tag.Hidden &&
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

    switchFilter(tag) {
        if(this.indexOfTagInTagList(tag, this.state.applicableTags) == -1) {
            return
        }
        const index = this.indexOfTagInTagList(tag, this.state.filter)
        if (index == -1) {
            const filter = this.state.filter.concat(tag)
            this.setState({
                filter: filter
            }, () => {this.loadTags()})
        } else {
            const filter = this.state.filter
            filter.splice(index, 1)
            this.setState({
                filter: filter
            }, () => {this.loadTags()})
        }
    }

    render() {
        if(this.state.tagsLoaded === false) {
            return <div>There are no loaded tags yet!</div>
        } else {
            const tags = this.state.tags
            console.log("applicable")
            console.log(this.state.applicableTags)

            const RenderTag = (tag, isSelected, isApplicable) => {
                const textColor = !tag.Hidden ? "text-white" : "text-blue-300"
                const filterMarkup = isSelected != -1 ? " underline border-red-600 bg-red-900 " : " bg-black border-white "
                const applicableMarkup = isApplicable ? " opacity-100 cursor-pointer " : " opacity-40 cursor-not-allowed "
                return <div class="px-1">
                    <div
                        class={"border rounded " + textColor + filterMarkup + applicableMarkup + " hover:text-black hover:bg-white px-1 py-1"}
                        onClick = {() => this.switchFilter(tag)}
                    >
                        #{tag.Name}
                    </div>
                </div>
            }

            return (
                <div class={"flex flex-col items-center gap-2"}>
                    <div class="flex flex-row flex-wrap mr-0 ">
                        {
                            tags.filter(tag => tag.Hidden === false).map((tag, i) => {
                                console.log("checking tag: " + tag.Name)
                                console.log(this.indexOfTagInTagList(tag, this.state.applicableTags) != -1)
                                return (
                                    <div key={tag.Name}>
                                        {RenderTag(tag,
                                            this.indexOfTagInTagList(tag, this.state.filter),
                                            this.indexOfTagInTagList(tag, this.state.applicableTags) != -1 )}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div class="flex flex-row flex-wrap">
                        {
                            tags.filter(tag => tag.Hidden === true).map((tag, i) => {
                                return (
                                    <div key={tag.Name}>
                                        {RenderTag(tag,
                                            this.indexOfTagInTagList(tag, this.state.filter),
                                            this.indexOfTagInTagList(tag, this.state.applicableTags) != -1)}
                                    </div>
                                )
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
