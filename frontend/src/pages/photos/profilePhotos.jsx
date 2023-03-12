import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddImageForm = () => {
  const [user_id, setUserId] = useState('');
  const [picture, setPath] = useState(null);
  const [caption, setCaption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the image and caption to the server
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('picture', picture);
    formData.append('caption', caption);

    // Send the form data to the server using the fetch API
    const response = await fetch('http://127.0.0.1:3001/post_gallery', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Image added successfully');
    } else {
      alert('Failed to add image');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField
        id="user_id"
        label="User Id"
        value={user_id}
        onChange={(e) => setUserId(e.target.value)}
      />
      <TextField
        id="image"
        type="file"
        onChange={(e) => setPath(e.target.files[0])}
      />
      <TextField
        id="caption"
        label="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Button type="submit" onClick={handleSubmit} variant="contained">Add Image</Button>
    </Box>
  );
};

export default AddImageForm;




// import React, { useState } from 'react';

// const AddImageForm = () => {
//   const [user_id, setUserId]=useState('')  
//   const [picture, setPath] = useState(null);
//   const [caption, setCaption] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a FormData object to send the image and caption to the server
//     const formData = new FormData();
//     formData.append('user_id', user_id)
//     formData.append('picture', picture);
//     formData.append('caption', caption);

//     // Send the form data to the server using the fetch API
//     const response = await fetch('http://127.0.0.1:3001/post_gallery', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       alert('Image added successfully');
//     } else {
//       alert('Failed to add image');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//       <label htmlFor="user_id">UserId:</label>
//       <input
//           type="text"
//           id="user_id"
//           value={user_id}
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <label htmlFor="image">Image:</label>
//         <input
//           type="file"
//           id="image"
//           onChange={(e) => setPath(e.target.files[0])}
//         />
//       </div>
//       <div>
//         <label htmlFor="caption">Caption:</label>
//         <input
//           type="text"
//           id="caption"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//         />
//       </div>
//       <button type="submit">Add Image</button>
//     </form>
//   );
// };

// export default AddImageForm;
