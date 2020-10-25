import React from 'react';
import './square.css';

const square=(props)=>{
    return(
        <div className="square">
            {
            props.mario===true &&
            <div>
               <img src={window.location.origin + "/Mario.png"} alt="Mario not Found"/>
            </div>
            }
            {
            props.sprite===true &&
            <div>
                <img src={window.location.origin + "/Sprite.png"} alt="Sprite not Found"/>
            </div>
            }
        </div>     
    );
};

export default square;  