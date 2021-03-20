import React from 'react'
import Content from './Content'
import TagOverview from './Tags'
import Modal from './Modal'

const App = () => {
  return (
    <div class="bg-gray-600">
      <div class="flex flex-col items-center space-y-4 mx-auto w-10/12 py-10">
        <div>Hello, this is Tagger</div>
        <TagOverview />
        <Content />
        <div>
          <form class="bg-blue-100 border rounded py-1 px-1 ">
          # <input type="text" class="bg-blue-100"/>
          </form>
        </div>
        <Modal />
      </div>
    </div>
  )
}

export default App