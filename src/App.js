import {useState} from 'react'
import './App.css';
import Calculator from './calculator'

function App() {
  const [currentId, setCurrentId] = useState(0);
  const [goldExchangeValue, setGoldExchangeValue] = useState('1000')
  
  const [renderList, setRenderList] = useState([0])

  const addCalculator = () => {
    let newList = [
      ...renderList,
      currentId + 1,
    ]
    console.log('added' ,newList);

    setCurrentId(currentId + 1)
    setRenderList(newList);
  }

  const removeCalculator = (id) => {
    console.log('removing', id);
    let newList = [...renderList].filter(calc => (calc !== id))
    console.log('removed', newList);
    setRenderList(newList);

  }
  return (
    <div className="App">
      <div className='input-headers'>
        <div className='input-header'>
          <label>Gold Exchange Value</label>
          <input type='text' value={goldExchangeValue} onChange={(e) => {if ((Number.parseInt(e.target.value))) {setGoldExchangeValue(Number.parseInt(e.target.value))} else {setGoldExchangeValue('0')}}} />
        </div>
      </div>
      {
        
      }
      {renderList.map(id => {
        return (
          <div key={id} style={{position: 'relative'}}>
            <Calculator goldExchangeValue={goldExchangeValue} />
            {
              (renderList.length > 1)
              ? <button 
                  className='btn btn-remove'
                  
                  onClick={() => removeCalculator(id)}
                >
                      Remove
                </button>
              : ''
            }
            
          </div>
        )
      })}
      <button onClick={addCalculator}>Add Item</button>
    </div>
  );
}

export default App;
