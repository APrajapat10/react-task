import React,{useState, useEffect} from 'react';
import './App.css';
import Square from './Components/square';


function App() {
  const height=10;
  const width=10;

  const [marioPosition, setMarioPosition] = useState([height/2,width/2]);
  const [spritePosition,setSpritePosition]= useState([]);

  useEffect(()=>{
    putSprites();
  },[]);
  
  function checkIfSpriteToBePrinted(row,col){
    for(let i=0;i<spritePosition.length;i++)
    {
      if(spritePosition[i][0]===row && spritePosition[i][1]===col)
        return true;
    }
  }
  function putSprites()
  {
    const numberOfSprites=(height<=width)?height:width;
    let arr = [];
    for(let i=0;i<numberOfSprites;i++)
    {
      let possibleSprite = [Math.floor(Math.random() * width),Math.floor(Math.random() * height)];
      if(possibleSprite[0] === marioPosition[0] && possibleSprite[1] === marioPosition[1])
        continue;
      arr.push(possibleSprite);
    }
    setSpritePosition(arr);
  }


  function displayRow(width,rowCount)
  {
    return(
    <div style={{display:'flex',flexDirection:'row'}}>
    {
      [...Array(width)].map((e,i)=>
        <Square key={`${rowCount}${i}`} mario={(rowCount===marioPosition[0] && i===marioPosition[1])?true:false}
        sprite={checkIfSpriteToBePrinted(rowCount,i)?true:false}/>
      )
    }
  </div>
  )
  }
  function displayColumn(height)
  {
    return(
      <div style={{display:'flex',flexDirection:'column'}}>
      {
        [...Array(height)].map((e,i)=>
        <div>    
      {displayRow(width,i)}
        </div>
        )  
      }        
   </div> 
    )
  }
 
  return (
       <div>{displayColumn(height)}</div>
  );
}

export default App;
