import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import LikeButton from './components/LikeButton';
import MouseTracker from './components/MouseTracker';
import DogShow from './components/DogShow';
import useMousePosition from './hooks/useMousePosition';
import withLoader from './components/withLoader';
import useURLLoader from './hooks/useURLLoader';

// 不建议使用的 react 高级属性  //也很难实现再次请求图片的操作
// const DogShowLoader = ({ isLoading, data }) => {
//   const style = {
//     width: 200
//   }
//   return (
//     <>
//       {isLoading ? <p>🐶Loading ... </p>
//         : <img src={data.message} alt="dog" style={style} />
//       }
//     </>
//   )
// }

const style = {
  width: 200
}

const DogShowWithHook = () => {
  const [url, setUrl] = useState("https://dog.ceo/api/breeds/image/random?t=" + Date.now());
  const [data, loading] = useURLLoader(url);

  const handleNextDog = () => {
    setUrl("https://dog.ceo/api/breeds/image/random?t=" + Date.now());
  };

  return (
    <>
      {loading ? <p>🐶Loading ... </p>
        : <img src={data && data.message} alt="dog" style={style} />
      }

      <button onClick={handleNextDog}> Next 🐶～下一张狗狗的图片 </button>
    </>
  )
}

const CatShowWithHook = () => {
  const [category, setCategory] = useState('1');
  const [data, loading] = useURLLoader(`https://api.thecatapi.com/v1/images/search?limit=18category_ids=${category}`);
  return (
    <>
      {loading ? <p>🐱Loading ... </p>
        : <img src={data && data[0].url} alt="cat" style={style} />
      }
      <button onClick={() => { setCategory('1') }}>🎩</button>
      <button onClick={() => { setCategory('5') }}>📦</button>

    </>
  )
}

function App() {
  // const position = useMousePosition();
  // const DogShowWithLoader = withLoader(DogShowLoader, "https://dog.ceo/api/breeds/image/random")

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/* <h1>{position.x}</h1> */}
        {/* <MouseTracker /> */}

        {/* <DogShow /> */}
        {/* <DogShowWithLoader /> */}
        <DogShowWithHook />
        <CatShowWithHook />
        <LikeButton />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
