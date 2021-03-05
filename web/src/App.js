import PreviousMap from 'postcss/lib/previous-map'
import React from 'react'
import Content from './Content'
import TagOverview from './Tags'

function App() {
  return <div class="flex flex-col items-center bg-gray-600 space-y-4">
    <div>Hello, this is Tagger</div>
    <TagOverview />
    <Content />
    </div>
}

export default App