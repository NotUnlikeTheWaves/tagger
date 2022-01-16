import { Tag, MapToLogicTag } from './tags'
import { ApiDocument, GetDocuments } from '../api/documents'
import React from 'react'
import { Button, Box } from '@chakra-ui/react'
import { CreateCard } from './documentCard'

export interface Document {
    name: string;
    tags: Tag[];
    url: string;
}

interface DocumentHolderState {
    documents: Document[]
}

function MapToLogicDocument(apiDocument: ApiDocument): Document {
    return {
        name: apiDocument.Name,
        url: "http://localhost:8080" + apiDocument.Url,
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
                this.setState({
                    documents: res.map((document) => MapToLogicDocument(document))
                })
            });
    }

    render() {
        return (
            <Box>
                {this.state.documents.map((doc) => <CreateCard document={doc} key={doc.name} />)}
            </Box>
        )
    }
}
    
