import React from 'react'
import './walletSetup.css'
//TODO:  setPhantomphantomExtensionDownloaded(true) to once you check that phantom extension has been installed properly on the client's device
// ! use https://www.twilio.com/blog/2018/03/detect-chrome-extension-installed.html
// ! or Use https://stackoverflow.com/questions/6293498/check-whether-user-has-a-chrome-extension-installed

const WalletSetup = () => {
  const [phantomExtensionDownloaded, setPhantomphantomExtensionDownloaded] =
    React.useState(true)
  return (
    <div className='wallet-wrapper-container'>
      <h1>SETUP WALLET</h1>
      {!phantomExtensionDownloaded ? (
        <div className='wallet-description'>
          <h4>Wallets are used to hold cryptocurrencies and nft’s</h4>
        </div>
      ) : null}
      <button className='wallet-download-btn'>
        {phantomExtensionDownloaded ? (
          <h1>CONNECT WALLET</h1>
        ) : (
          <h1>DOWNLOAD PHANTOM WALLET</h1>
        )}
      </button>
      <div className='wallet-indicator'>
        <span className='indicator indicator-active'></span>
        <span className='indicator'></span>
      </div>
    </div>
  )
}

export default WalletSetup
