import {useState, useEffect} from 'react'
// import './calculator.css';

function Calculator(params) {
  const [goldValue, setGoldValue] = useState(params.goldExchangeValue);

  const [ahPrice, setAhPrice] = useState('1000');
  const [ahBundleSize, setAhBundleSize] = useState('1');
  const [ahQuantity, setAhQuantity] = useState('1');
  const [mariCrystalPrice, setMariCrystalPrice] = useState('95');
  const [mariQuantity, setMariQuantity] = useState('1');
  
  const [ahGoldPricePerItem, setAhGoldPricePerItem] = useState('');
  const [mariGoldPricePerItem, setMariGoldPricePerItem] = useState('');

  const [ahCashMoneysPerItem, setAhCashMoneysPerItem] = useState('');
  const [mariCashMoneysPerItem, setMariCashMoneysPerItem] = useState('');
  const [betterDeal, setBetterDeal] = useState('');


  useEffect(() => {
      setGoldValue(params.goldExchangeValue)
  },[params])

  useEffect(() => {
    let bundleSize = (ahBundleSize > 0) ? ahBundleSize : 1;
    setAhGoldPricePerItem(ahPrice/bundleSize)
  },[ahPrice,ahBundleSize])

  useEffect(() => {    
    let bundleSize = (mariQuantity > 0) ? mariQuantity : 1;
    let goldEquivalent = 
      (mariCrystalPrice/bundleSize) //get per item
      * goldValue / 95 // convert gold to crystal ratio
    setMariGoldPricePerItem(goldEquivalent)
  },[mariCrystalPrice,mariQuantity, goldValue])

  useEffect(() => {
    let goldPerRoyal = (goldValue / 238) * 100

    let ahCashMoneys = (ahGoldPricePerItem / goldPerRoyal)
    let mariCashMoneys = mariGoldPricePerItem / goldPerRoyal
    if ((ahPrice * ahBundleSize * mariCrystalPrice * mariQuantity) > 0) {
      setBetterDeal(
        (ahCashMoneys < mariCashMoneys) ? 'ah' 
        : (ahCashMoneys == mariCashMoneys) ? ''
        : 'mari'
        )
    } else {
      setBetterDeal('');
    }
    setAhCashMoneysPerItem(ahGoldPricePerItem / goldPerRoyal)
    setMariCashMoneysPerItem(mariGoldPricePerItem / goldPerRoyal)
  },[ahGoldPricePerItem,mariGoldPricePerItem])

  return (
    <div className="calculator">
      <div className='hmm'>
        <div className='input-headers'>
          <div className='input-header'>
            <input type='text' placeholder="Item Name (reference only)"/>
          </div>
        </div>
        <div className='input-section'>
          <div className='input-group'>
            <label>
              Auction House Price
            </label>
            <input 
              type='number' 
              value={ahPrice} 
              onChange={(e) => setAhPrice(e.target.value)} 
              className={ (ahPrice < 1) ? 'empty' : ''}
            />
          </div>
          <div className='input-group'>
            <label>
              AH Bundle Size
            </label>
            <input 
              type='number' 
              value={ahBundleSize} 
              onChange={(e) => setAhBundleSize(e.target.value)}
              className={ (ahBundleSize < 1) ? 'empty' : ''}
            />
          </div>
          <div className='input-group'>
            <label>
              Desired Qty
            </label>
            <input 
              type='number' 
              value={ahQuantity} 
              onChange={(e) => setAhQuantity(e.target.value)}
              className={ (ahQuantity < 1) ? 'empty' : ''}
            />
          </div>
          <div className='input-group'>
            <label>
              Mari Crystal Price
            </label>
            <input 
              type='number' 
              value={mariCrystalPrice} 
              onChange={(e) => setMariCrystalPrice(e.target.value)}
              className={ (mariCrystalPrice < 1) ? 'empty' : ''}
            />
          </div>
          <div className='input-group'>
            <label>
              Mari Quantity
            </label>
            <input 
              type='number' 
              value={mariQuantity} 
              onChange={(e) => setMariQuantity(e.target.value)}
              className={ (mariQuantity < 1) ? 'empty' : ''}
            />
          </div>
        </div>
        <div className='math-is-hard'>
          <div className='display-values'>
            <div className={`display-category ${(betterDeal === 'ah') ? 'better-deal' : ''}`}>
              <div className='display-category__row'>
                <h2>Auction House</h2>
              </div>
              <div className='display-category__row'>
                <h3>Gold (per item)</h3>
                <div className='color-gold'>{Number.parseFloat(ahGoldPricePerItem * ahQuantity * ahBundleSize).toFixed(2)}</div>
                <div className='color-gold'>({Number.parseFloat(ahGoldPricePerItem).toFixed(2)})</div>
              </div>
              <div className='display-category__row'>
                <h3>Cash Moneys (per item)</h3>
                <div className='color-money'>${Number.parseFloat(ahCashMoneysPerItem * ahQuantity * ahBundleSize).toFixed(2)}</div>
                <div className='color-money'>(${Number.parseFloat(ahCashMoneysPerItem).toFixed(2)})</div>
              </div>
            </div>
            <div className={`display-category ${(betterDeal === 'mari') ? 'better-deal' : ''}`}>
            <div className='display-category__row'>
                <h2>Dear Mari's</h2>
              </div>
              <div className='display-category__row'>
                <h3>Gold Equivalent (per item)</h3>
                <div className='color-gold'>{Number.parseFloat(mariGoldPricePerItem * mariQuantity).toFixed(2)}</div>
                <div className='color-gold'>({Number.parseFloat(mariGoldPricePerItem).toFixed(2)})</div>
              </div>
              <div className='display-category__row'>
                <h3>Cash Moneys Equivalent (per item)</h3>
                <div className='color-money'>${Number.parseFloat(mariCashMoneysPerItem * mariQuantity).toFixed(2)}</div>
                <div className='color-money'>(${Number.parseFloat(mariCashMoneysPerItem).toFixed(2)})</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Calculator;
