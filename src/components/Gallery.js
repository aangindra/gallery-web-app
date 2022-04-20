import { Fragment, useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";
import { showLoadingSpinner, hideLoadingSpinner } from "../App";

const BASE_URL = "https://api.unsplash.com";
const CLIENT_ID = "8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b";

const LIST_PAGE_SIZE = [
  5,
  10,
  30,
];

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [collections, setCollections] = useState([])
  const [queryParams, setQueryParams] = useState({
    query: "",
    page: 1,
    per_page: 5
  });

  const [selectedTag, setSelectedTag] = useState({})

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  useEffect(() => {
    getCollections();
  }, [])

  const getCollections = async () => {
    let params = { page: 1, per_page: 5 };
    params = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    let response = await fetch(`${BASE_URL}/collections?client_id=${CLIENT_ID}&${params}`);
    response = await response.json()
    setCollections(response);
  }

  const getPhotos = async () => {
    showLoadingSpinner();

    const params = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
    let response;
    let results = []
    if (queryParams.query) {
      response = await fetch(`${BASE_URL}/search/photos?client_id=${CLIENT_ID}&${params}`)
      response = await response.json();
      results = response.results;
    } else {
      response = await fetch(`${BASE_URL}/photos?client_id=${CLIENT_ID}&${params}`)
      results = await response.json();
    }

    setPhotos(results);
    hideLoadingSpinner();

  };

  const handleSearch = e => {
    setQueryParams({
      ...queryParams,
      query: e.target.value
    })
  }

  const debouncedEventHandler = useMemo(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    () => debounce(handleSearch, 1000), []);

  const handleChangePage = e => {
    setQueryParams({
      ...queryParams,
      page: 1,
      per_page: parseInt(e.target.value)
    })
  };
  const handleSelectTag = (collection) => e => {
    setSelectedTag({
      ...collection
    });
    setQueryParams({
      query: collection.title,
      page: 1,
      per_page: 5
    })
  }
  return (
    <Fragment>
      <div className="mx-auto bg-cornflower-blue-500 py-16">
        <h2 className="text-white text-2xl mb-8">Gallery Web-App</h2>
        <input type="text" onChange={debouncedEventHandler} style={{ backgroundColor: "#f5f5f5" }} className="text-slate-700 py-2 px-4 w-full w-1/2 rounded-md shadow-lg outline-0" placeholder="Search with keyword, eg: cat, tree, macbook" />
        <div className="mx-auto mt-4 w-1/2">
          <h4 className="text-white mb-2">Popular tags:</h4>
          <div className="grid grid-cols-3 gap-2">
            {collections.map(collection => (
              <button key={collection.id} onClick={handleSelectTag(collection)} className={`border ${selectedTag && selectedTag.id === collection.id ? "border-white text-white bg-violet-500" : "border-slate-600 text-slate-700 bg-white"} px-4 shadow-lg rounded-xl`}>{collection.title}</button>
            ))}
          </div>

        </div>
      </div>

      <div className="sm:px-6 md:px-4 lg:px-4">
        <div className="mt-5">
          <h4>Show
            <select onChange={handleChangePage} className="border border-slate-500 rounded-md px-2 mx-1">
              {LIST_PAGE_SIZE.map(pageSize => (
                <option key={pageSize} value={pageSize}>{pageSize}</option>
              ))}
            </select>images</h4>
        </div>
        <div className="mt-8 md:masonry-2-col lg:masonry-3-col box-border mx-auto before:box-inherit after:box-inherit">
          {photos.map(photo => (
            <div key={photo.id} className="break-inside mb-6 rounded-lg">
              <img src={photo.urls.regular} alt={photo.alt_description} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Gallery;
