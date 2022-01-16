import { Tag, MapToLogicTag } from './tags'
import { ApiDocument, GetDocuments } from '../api/documents'
import React from 'react'
import { Button, Box } from '@chakra-ui/react'

interface Document {
    name: string;
    tags: Tag[];
    url: string;
}

interface DocumentHolderState {
    documents: Document[]
}

function MapToLogicDocument(apiDocument: ApiDocument): Document {
    console.log("idv")
    console.log(apiDocument)
    return {
        name: apiDocument.Name,
        url: apiDocument.Url,
        tags: apiDocument.Tags.map((tag) => MapToLogicTag(tag))
    }
}

export class DocumentHolder extends React.Component<{}, DocumentHolderState> {
    state: DocumentHolderState = {
        documents: []
    }

    constructor(props: {}) {
        super(props)
        GetDocuments()
            .then(res => {
                console.log("test")
                console.log(res)
                this.setState({
                    documents: res.map((document) => MapToLogicDocument(document))
                })
            });
    }

    render() {
        const document = this.state.documents[0]
        if(document) {
            return <Box>Hi there</Box>
        }
        return (
            <Box>
                {this.state.documents.map((doc) => <div>hi</div>)}
            </Box>
        )
    }
}
    
