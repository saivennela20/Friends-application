import React from 'react';

// destructuring - allows to grap the props object and grab its properties  
const SearchBox=({searchChange}) => {
    return (
        <div className='pa2'>
            <input className='pa3' type='search' 
            placeholder='Search Rooms' onChange={searchChange}/>
            {/* <button class="" id='new-room-btn' type="submit">Create</button> */}
        </div>

    );
}

export default SearchBox;