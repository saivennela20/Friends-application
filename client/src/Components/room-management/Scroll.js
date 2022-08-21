import React, { Component } from 'react';


// scroll can use its children to render its children
const Scroll = (props) => {
   // return props.children;   //CardList
    return (
        <div>
            {props.children}
        </div>
    )
};

export default Scroll;