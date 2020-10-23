import React from 'react';
import './square.css';

const square=(props)=>{
    return(
        <div className="square">
            {
            props.mario===true &&
            <div>
                M
            </div>
            }
            {
            props.sprite===true &&
            <div>
                S
            </div>
            }
        </div>     
    );
};

export default square;  