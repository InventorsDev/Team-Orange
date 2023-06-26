import { useState, useEffect } from 'react';
import './App.css';
import Typewriter from 'typewriter-effect'
import Intro from './Components/intro';



function App() {
  const [loaded, setLoaded] = useState(false)

  var opening =  (
       <div className="O--page">

         <header className="O--container">
            <div className='Tranquil-logo'><p className='T-Name'>Tranquil</p></div>
            <p className='T-box'>
              <Typewriter 
                   onInit={(typewriter)=>{
                    typewriter.changeDelay(20).typeString('Finding Balance').pauseFor(300).deleteAll().typeString('Nurturing Well-being').start()

                   }}
              />
              </p>
         </header> 

      </div>
   );

  setTimeout(
   ()=>{ setLoaded(true) }, 3000
  )


return (
    <>
    {
      loaded === false ? <>{opening}</> : <>{opening}</>
    }
    </>
  )
 

}

export default App;
