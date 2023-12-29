import './App.css';
import IndexRouter from './router/IndexRouter';

function App() {

  // useEffect(() => {
  //   axios.get('/smart/view/news/r/tNewsPositionService_listNews?lanType=zh-CN&positionNo=msgcenter_4').then((res) => {
  //     console.log(res.data.data)
  //   })
  // }, [])

  return (
    <div className="App">
      <IndexRouter></IndexRouter>
    </div>
  );
}

export default App;
