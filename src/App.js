import './App.scss';
import {useState,useEffect} from 'react';
import { FaTwitter,FaQuoteLeft } from 'react-icons/fa'
const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
const colors = ['#16a085','#27ae60','#2c3e50','#f39c12','#e74c3c','#9b59b6','#FB6964','#342224','#472E32','#BDBB99','#77B1A9','#73A857'];
function App() {
  const [quotesArray,setQuotesArray]=useState([]);
  const [quote,setQuote] = useState('');
  const [author,setAuthor]=useState('');
  const [randomColor,setRandomColor]=useState(colors[Math.floor(Math.random()*colors.length-1)]);
  const fetchTours = async()=>{
      const response = await fetch(url);
      const data = await response.json();
      setQuotesArray(data.quotes);
      
      const randomIndex = Math.floor(Math.random() * data.quotes.length-1);
      setAuthor(data.quotes[randomIndex].author);
      setQuote(data.quotes[randomIndex].quote);

  }
  useEffect(()=>{
    fetchTours();
    
  },[])

  const changeQuote=()=>{
    const randomIndex = Math.floor(Math.random() * quotesArray.length-1);
    setAuthor(quotesArray[randomIndex].author);
    setQuote(quotesArray[randomIndex].quote);
    let randomNum = Math.floor(Math.random()*colors.length-1);
    if(randomColor === colors[randomNum]&&randomNum!==colors.length-1){
      randomNum++;
    }
    if(randomColor === colors[randomNum]&&randomNum==colors.length-1){
      randomNum--;
    }
    
    setRandomColor(colors[randomNum]);

  }
  return (
    <div className="App" style={{backgroundColor:randomColor}}>
      <div id='quote-box' className='box' >
        <div>
           <p id='text'className='quote' style={{color:randomColor}}><FaQuoteLeft /> {quote}</p>
          <p id='author' className='author'style={{color:randomColor}}>- {author}</p>
        </div>
        <div className='button-group'>
          <a style={{backgroundColor:randomColor}} 
          id='tweet-quote'
          href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>
            <FaTwitter />
            </a>
          <button style={{backgroundColor:randomColor}}id='new-quote'onClick={()=>changeQuote()}>New quote</button>
        </div>
      </div>
    </div>
  );
}

export default App;
