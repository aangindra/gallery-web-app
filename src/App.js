import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://api.unsplash.com/photos/";
const CLIENT_ID = "8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b";

const App = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    getPhotos()
  }, []);

  const getPhotos = async () => {
    const response = await fetch(`${BASE_URL}?client_id=${CLIENT_ID}`)
    const result = await response.json();
    setPhotos(result);
  };

  return (
    <div className="App">
      <div className="mx-auto bg-cornflower-blue-500 py-16">
        <h2 className="text-white text-2xl mb-8">Gallery Web-App</h2>
        <input type="text" style={{ backgroundColor: "#f5f5f5" }} className="py-2 px-4 w-full w-1/2 rounded-md shadow-lg outline-0" placeholder="Search with keyword. eg: cat, tree, macbook" />
      </div>
      <div className="sm:px-6 md:px-4 lg:px-4">
        <div className="mt-8 md:masonry-2-col lg:masonry-3-col box-border mx-auto before:box-inherit after:box-inherit">
          {photos.map(photo => (
            <div className="break-inside mb-6 rounded-lg">
              <img src={photo.urls.regular} alt={photo.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
