import { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const colors = [
    "hsl(230, 100%, 33%)",
    'hsl(0, 100%, 33%)', 
    'hsl(144, 100%, 33%)',
    "hsl(186, 100%, 33%)",
    "hsl(312, 100%, 33%)",
    "hsl(56, 100%, 33%)",
    "hsl(199, 100%, 33%)"
  ]
  const [animate, setAnimate] = useState(false)
  const [quotes, setQuotes] = useState(null)
  const [randomColor, setRandomColor] = useState(Math.floor(Math.random() * colors.length))
 
  const changeColor = () => {
     setRandomColor(Math.floor(Math.random() * colors.length))
     setAnimate(true)
     setTimeout(() => {setAnimate(false)},2000)
  }

  let random;
  let link;
  if (quotes){
    random = Math.floor(Math.random() * quotes.length)
    link = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quotes[random].quote} ${quotes[random].author} #quotes`)}`
  }

  const fetchData = async () => {
    try{
      const response = await axios.get("https://dummyjson.com/quotes")
      setQuotes(response.data.quotes)
    }catch(e){
      console.log(e.message)
    }
  }

  useEffect(() => {
    fetchData()
    changeColor()
  }, [])
  
  return (
    <>
    { quotes &&
      <div id="wrapper" className={animate ? "animated" : ""} style={{backgroundColor: colors[randomColor]}}>
        <div id="quote-box">
          <p id="text" className={animate ? "new-text" : ""}  style={{color: colors[randomColor]}}><FontAwesomeIcon style={{fontSize: "2rem"}} icon={faQuoteLeft} /> {quotes[random].quote}</p>
          <p id="author" className={animate ? "new-text" : ""} style={{color: colors[randomColor]}}>-{quotes[random].author}</p>
          <div style={{display: "flex", justifyContent: "space-between", textAlign: "center"}}>
            <a href={link}  role="noopener noreferrer" id="tweet-quote" target="_blank" ><FontAwesomeIcon style={{backgroundColor: colors[randomColor],borderRadius: "2px" , padding: "0.5rem", color: "white" , fontSize:"1rem", marginTop: "1rem"}} icon={faTwitter} /></a>
            <button id="new-quote"  onClick={() => changeColor()} style={{color: 'white', backgroundColor: colors[randomColor]}}>New quote</button>
            
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default App