import React from "react";
import { RenderDocument } from "./Content"

// Source: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular

export default function EditTags(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [addTagField, setAddTagField] = React.useState("sample");

  function submitNewTag(e) {
    e.preventDefault()
    props.addTag({
      Name: addTagField,
      Hidden: false
    })
    setAddTagField("")
  }

  function RenderTagsInEditMode(tags, deleteCallback) {
    const RenderTag = (tag) => {
      const textColor = !tag.Hidden ? "text-white" : "text-blue-300"
      return <div class="px-1">
          <div class={"hover:opacity-70 bg-black border rounded " + textColor + " hover:line-through cursor-pointer px-1 py-1"}>
              #{tag.Name}
          </div>
      </div>
    }
    return (
        <div class={"flex flex-col items-left gap-2"}>
            <div class="flex flex-row flex-wrap mr-0 ">
                {
                    tags.filter(tag => tag.Hidden === false).map((tag, i) => {
                        return <div key={tag.Name} onClick={() => deleteCallback(tag)}>{RenderTag(tag)}</div>
                    })
                }
            </div>
            <div class="flex flex-row flex-wrap">
                {
                    tags.filter(tag => tag.Hidden === true).map((tag, i) => {
                        return <div key={tag.Name} onClick={() => deleteCallback(tag)}>{RenderTag(tag)}</div>
                    })
                }
            </div>
        </div>
    )
  }

  return (
    <>
      <button
        className="self-center bg-blue-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-600 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-700 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {props.document.Name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div class="flex flex-rows gap-2">
                    <div class="w-2/3">
                      {RenderDocument(props.document)}

                      <div class="text-yellow-400 text-right underline">
                        {props.document.Name}
                      </div>
                    </div>
                    {/* Place content between seems a bit hacky but gives me the result I want */}
                    <div class="w-1/3 flex items-stretch place-content-between gap-2 border-l-4 border-blue-600 flex-col pl-2">
                      <div class="">
                      {
                        RenderTagsInEditMode(props.document.Tags, props.removeTag)
                      }
                      </div>
                      <div class="self-center">
                        <form class="bg-blue-200 border-2 border-blue-600 rounded py-2 px-2 w-10/12 " onSubmit={(e) => submitNewTag(e)}>
                        <label class="text-blue-600 font-bold">#</label>
                        <input
                          value={addTagField}
                          type="text"
                          class="focus:outline-none font-bold pl-1 pb-1 bg-blue-200 w-10/12 text-gray-700 focus:text-gray-600"
                          onChange={(e) => setAddTagField(e.target.value)}
                        />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
