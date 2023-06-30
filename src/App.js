import { useState } from 'react';
import './App.css';
import Typewriter from 'typewriter-effect'
import SignUp from './Components/signUp';
import Intro from './Components/intro';
import Credentials from './Components/credentials';
import { Routes, Route } from 'react-router';

function App() {
  const [loaded, setLoaded] = useState(false)

  function Opening  ()  {
      return (
         <div className="O--page">

         <header className="O--container">
            <div className='Tranquil-logo'><p className='T-Name'>Tranquil</p></div>
            <p className='T-box'>
              <Typewriter 
                   onInit={(typewriter)=>{
                    typewriter
                    .changeDelay(20)
                    .typeString('Finding Balance')
                    .pauseFor(300)
                    .deleteAll()
                    .typeString('Nurturing Well-Being')
                    .start()

                   }}
              />
              </p>
         </header> 

      </div>
   );

 }

  setTimeout(
   ()=>{ setLoaded(true) }, 6000
  )
 



  return (

    <Routes>
        <Route exact path ='/' element = {loaded === false ? <Opening /> : <SignUp />} />
        <Route path = '/getStarted' element = {<Intro />} />
        <Route path = '/createAccount' element = {<Credentials />} />
    </Routes>
  )
  }

export default App;
