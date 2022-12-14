import axios from 'axios'



const ImageUpload = ({ itemFields, setItemFields }) => {


  const handleChange = async (e) => {
    try {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
      setItemFields({ ...itemFields, item_image: data.secure_url })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      <label>Image of Item:</label>
      {itemFields.item_image ?
        <img src={itemFields.item_image} alt='item image' />
        :
        <input
          type='file'
          onChange={handleChange}
        />
      }
    </div>
  )
}

export default ImageUpload