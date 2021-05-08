import React from 'react'
import Content from './Content'
import TagOverview from './Tags'
import UploadModal from './UploadModal'

const App = () => {
  const [filters, setFilters] = React.useState([])
  const [content, setContent] = React.useState([])
  return (
    <div class="bg-gray-600">
      <div class="flex flex-col items-center space-y-4 mx-auto w-10/12 py-10">
        <div>Hello, this is Tagger</div>
        <UploadModal refresh={() => content.loadContent()} />
        <TagOverview setFilters={setFilters} />
        <Content filters={filters} ref={instance => {setContent(instance)}} />
      </div>
    </div>
  )
}

export default App
