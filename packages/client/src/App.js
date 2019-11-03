import React from 'react'
import { useFormDispatch } from './util/FormContext'
import './App.css'

function App() {
  const [titleState, setTitleState] = React.useState(null)
  const [fileState, setFileState] = React.useState(null)
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false)
  const dispatch = useFormDispatch()

  React.useEffect(() => {
    return () => dispatch({ type: 'upload', payload: { file: fileState, title: titleState } })
  }, [dispatch, fileState, titleState])

  const handleSubmit = async event => {
    setIsSubmitLoading(true)
    event.preventDefault()

    // set up form data
    const formData = new FormData()
    formData.append('title', titleState)
    formData.append('file', fileState)
    const response = await fetch('http://localhost:3001/api', {
      method: 'POST',
      headers: {
        // setting content type to multipart/form-data causes an error
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      body: formData,
    })
    const data = await response.json()
    if (data) setIsSubmitLoading(false)
    return data
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    return setFileState(file)
  }

  return (
    <div className="App">
      <h1>upload</h1>
      <form action="/api" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="upload-title">Title:</label>
        <input
          type="text"
          name="upload-title"
          id="form--upload-title"
          onChange={e => setTitleState(e.target.value)}
        />{' '}
        <br />
        <label htmlFor="upload-word">Word Document:</label>
        <input type="file" name="upload-word" id="form--upload-file" onChange={handleFileChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      {isSubmitLoading ? (
        <p>Loading...</p>
      ) : (
        JSON.stringify({ title: titleState, file: JSON.stringify(fileState) }, null, 2)
      )}
    </div>
  )
}

export default App
