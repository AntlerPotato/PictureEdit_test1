import React, { useState } from 'react';
import ImageEditor from './components/ImageEditor';

function App() {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="app">
            <h1>Image Editor</h1>
            <input type="file" onChange={handleImageUpload} />
            {image && <ImageEditor image={image} />}
        </div>
    );
}

export default App;
