import { ApiTag, GetTags } from '../api/tags'
import React from 'react'
import { Button, Box } from '@chakra-ui/react'

type TagSelecterState = {
    tags: Tag[]
};

export interface Tag {
    name: string;
    hidden: boolean;
    selected: boolean;
}

export function MapToLogicTag(apiTag: ApiTag): Tag { 
    return {
        name: apiTag.name,
        hidden: apiTag.hidden,
        selected: false
    };
}

export class TagSelecter extends React.Component<{}, TagSelecterState>  {
    state: TagSelecterState = {
        tags: []
    }
    constructor(props: {}) {
        super(props);
        const tags = GetTags()
        this.state = {
            tags: tags.map((tag) => MapToLogicTag(tag))
        }
    }

    render() {
        return (
            <Box>
                {this.state.tags.map((tag) => 
                    <Button colorScheme='blue'
                        variant={tag.selected ? 'solid' : 'outline'}
                        size='xs' mx='2px'
                        key={tag.name}
                        onClick={() => this.onClickTag(tag)}>
                      {tag.name}
                    </Button>
                )}
            </Box>
        )
    }

    

    onClickTag(tag: Tag) {
        const idx = this.state.tags.findIndex((element) => element.name == tag.name);
        let stateChange = this.state.tags;
        stateChange[idx].selected = !stateChange[idx].selected
        this.setState({
            tags: stateChange
        });
    }
}

// Test stuff for how tags look
{/* <Button colorScheme='blue' variant='solid' size='xs'>
#clicked-tag
</Button>
<Button colorScheme='blue' variant='outline' size='xs'>
#unclicked-tag
</Button>
<Button colorScheme='gray' variant='outline' size='xs'>
#unclickable-tag
</Button>
<Button colorScheme='blue' variant='link' size='xs'>
Button
</Button> */}