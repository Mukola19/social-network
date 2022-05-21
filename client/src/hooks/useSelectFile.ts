import { useEffect, useState } from 'react'

export const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [preview, setPreview] = useState<string>('')

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const clearSelectedFile = () => {
    setSelectedFile(undefined)
  }

  return { onSelectFile, selectedFile, preview, clearSelectedFile }
}
