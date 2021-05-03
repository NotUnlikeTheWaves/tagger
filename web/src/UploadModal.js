import React from "react";
// Source: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular


export default function UploadModal(document, updateTags) {
  const [showModal, setShowModal] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  function close() {
    setShowModal(false)
    setFiles([])
  }

  function handleFileSelect(event) {
    console.log(event.target.files)
    setFiles([...event.target.files])
  }

  return (
    <>
      <button
        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
      >
        Upload
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            // onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-600 outline-none focus:outline-none">
                  
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-700 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add files
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={close}
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                {
                  console.log("f")
                }
                {console.log(files)}
                <div className="relative p-6 flex-auto">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                  />
                  {files.map(f => {
                    console.log(f)
                    return <div class="text-blue-50 text-lg leading-relaxed">{f.name}</div>
                  })}
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-700 rounded-b">
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Upload
                  </button>
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
