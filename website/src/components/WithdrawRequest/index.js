import React, { useEffect, useState, useCallback } from 'react'
import {
  Container,
  Button,
  // FormGroup,
  TextField,
  CircularProgress
} from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import { cross } from '../../utils/svg'
import { botWithdrawRequest } from '../../API/BotAPI'
import { toast } from 'react-toastify'
import { getBotId } from '../../API/BotAPI'
import * as LoginAPI from '../../API/LoginAPI'

import {
  Connection,
  SystemProgram,
  clusterApiUrl,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL
} from '@solana/web3.js'

const RPC_URL = 'https://api.mainnet-beta.solana.com/'

const sleep = async (s) => {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

const WithdrawRequest = (props) => {
  const history = useHistory()
  const [botId, setBotId] = useState('')
  const [userWalletId, setUserWalletId] = useState('')
  const [amount, setAmount] = useState('')
  const [isDisabled, setDisabled] = useState(false)
  const [showWithdrawLoader, setWithdrawLoader] = useState(false)
  const [showDepositLoader, setDepositLoader] = useState(false)
  const [showRefreshLoader, setRefreshLoader] = useState(false)
  const escEvent = useCallback((e) => {
    if (e.code === 'Escape') {
      history.push('/manage-bot')
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escEvent)
    return () => {
      document.removeEventListener('keydown', escEvent)
    }
  }, [])

  useEffect(() => {
    getBotWallet()
  }, [])

  const getBotWallet = async (data) => {
    try {
      const response = await getBotId()
      const bot_wallet_pubkey = response.data?.bot_wallet
      if (!bot_wallet_pubkey) throw new Error()
      setBotId(bot_wallet_pubkey)
      fetchBotWalletBalance(bot_wallet_pubkey)
    } catch {}
  }

  const [balance, setBalance] = useState(0)

  const fetchBotWalletBalance = async (bot_wallet_pubkey) => {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', RPC_URL)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const response = JSON.parse(`${xhr.responseText}`)
        setBalance(response?.result?.value || 0)
        setRefreshLoader(false)
        setDisabled(false)
        toast.success('Balance refreshed.')
      } else {
        setRefreshLoader(false)
        setDisabled(false)
      }
    }
    let query = {
      jsonrpc: '2.0',
      id: '1',
      method: 'getBalance',
      params: [`${bot_wallet_pubkey}`]
    }

    var data = JSON.stringify(query)
    xhr.send(data)
  }

  const TRANSFER_FEE = 0.000005;
  const createWithdrawRequest = async () => {
    debugger
    // form validation
    if (!amount || amount === '') {
      setAmount(0)
      setWithdrawLoader(false)
      toast.error(`Please enter an amount greater than ${TRANSFER_FEE}.`)
      setDisabled(false)
      return
    }

    // setAmount(parseFloat(amount))
    
    if (balance < TRANSFER_FEE) {
      setAmount(0)
      setWithdrawLoader(false)
      toast.error(`Insufficient bot-wallet balance.`)
      setDisabled(false)
      return
    }
    
    // const balance_sol = balance / LAMPORTS_PER_SOL
    // if (balance_sol > amount) {
      // setAmount(0)
      // setWithdrawLoader(false)
      // toast.error(`Cannot withdraw amount greater than the balance ${balance_sol} SOL.`)
      // setDisabled(false)
      // return
    // }
    
    const request = {
      // user_id: userData._id,
      // user_wallet: { pubkey: jwt.pubkey },
      // bot_wallet: { pubkey: botId },
      withdraw_amount: amount,
    }

    const connection = new Connection(RPC_URL, 'confirmed')
    const bot_pubkey = new PublicKey(botId)
    const CONFIRMATION_TIMEOUT = 1000 * 60  // 60 seconds

    try {
      // snapshot the current balance..
      let balance_pre = await connection.getBalance(bot_pubkey)
      balance_pre = balance_pre || 0

      // create the withdraw_request document..
      await botWithdrawRequest({ ...request })
      toast.success(`Withdraw request submitted.. Awaiting tx confirmation..`)

      // now, await for at least 60 seconds,
      // and poll for a change in the bot wallet's,
      // balance, if the timeout occurs, we can assume
      // the transfer failed, and notify the user to retry..
      let success = false

      const _check = async () => {
        let balance_post = await connection.getBalance(bot_pubkey)
        // balance change detected..
        if (balance_post < balance_pre) {
          success = true
          // re-enable form & ui..
          setAmount(0)
          setWithdrawLoader(false)
          setDisabled(false)
          toast.success(`Withdraw request processed.`)
        }
        // no change, retry..
        else {
          toast.success(`Awaiting tx confirmation in 1s..`)
          await sleep(1)
          return _check()
        }
      }

      setTimeout(() => {
        if (success) return // ignore..
        success = false
        // re-enable form & ui..
        setAmount(0)
        setWithdrawLoader(false)
        setDisabled(false)
        toast.error(`Awaiting confirmation timeout. Try again.`)
      }, CONFIRMATION_TIMEOUT)

      // TODO: we should provide the user with a 
      // withdrawrequestid here, so they can use for
      // support requests
    }
    catch (ex) {
      // TODO: better error handling here
      // we might want to parse/inspect this error..
      toast.error(`Server Error: ${ex}`)
      setDisabled(false)
    }

  }


  // DEPOSIT

  const handleCopyText = () => {
    const selectText = document.getElementById('id-box')
    navigator.clipboard.writeText(selectText.innerText)
    toast.success('Text Copied')
  }

  const depositAmount = async () => {
    if (amount && amount !== '' && amount > 0) {
      const isPhantomInstalled = window.solana && window.solana.isPhantom

      if (isPhantomInstalled) {
        try {
          var connection = new Connection(
            clusterApiUrl('mainnet-beta'),
            'confirmed'
          )

          const botPubKey = new PublicKey(botId)
          const wallet = await window.solana.connect()

          let transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: wallet.publicKey,
              toPubkey: botPubKey,
              lamports: amount * LAMPORTS_PER_SOL
            })
          )

          transaction.feePayer = wallet.publicKey

          let { blockhash } = await connection.getRecentBlockhash()
          transaction.recentBlockhash = blockhash

          let signed = ''
          try {
            signed = await window.solana.signTransaction(transaction)
          }
          catch (err) {
            console.error('error signing tx:', err)
          }

          let txid = ''
          try {
            txid = await connection.sendRawTransaction(signed.serialize())
          }
          catch (ex) {
            console.log('error sending tx:', ex)
            toast.error(`Error sending transaction: ${ex}`) 
          }

          try {
            await connection.confirmTransaction(txid)

            toast.success(`SOL deposit successful: ${txid}`)
            setAmount(0)
            setDepositLoader(false)
            setDisabled(false)
          }
          catch (err) {
            setDisabled(false)
            setDepositLoader(false)
            toast.error(`Unable to confirm transaction: ${err}`)
          }
        }
        catch (ex) {
          toast.error(`Error ${ex}`)
        }

      } else {
        setAmount(0)
        setDepositLoader(false)
        setDisabled(false)
        window.open('https://phantom.app/', '_blank')
      }
    } else {
      setAmount(0)
      setDepositLoader(false)
      setDisabled(false)
      toast.error('Please enter an amount.')
    }
  }

  const fetchUserWalletBalance = async () => {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', RPC_URL)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const response = JSON.parse(`${xhr.responseText}`)
        if (
          response?.result?.value &&
          response?.result?.value > 0 &&
          response?.result?.value / LAMPORTS_PER_SOL > amount
        ) {
          depositAmount()
        }
        else {
          setDisabled(false)
          setDepositLoader(false)
          setAmount(0)

          // TODO: this error condition could be
          // an issue which is not insufficient balance,
          // we need better error handling here 
          // (for eg. network error)
          toast.error('Error')
        }
        return false
      }
    }

    await LoginAPI.getAccount((pubkey) => {
      setUserWalletId(pubkey)
      let query = {
        jsonrpc: '2.0',
        id: '1',
        method: 'getBalance',
        params: [`${userWalletId}`]
      }
      var data = JSON.stringify(query)
      xhr.send(data)
    })

  }

  return (
    <Container
      className='container-marg-top animate__animated animate__fadeInUp'
      id='collection-view'
    >
      <Link
        to={{
          pathname: '/manage-bot'
        }}
      >
        <div className='cross-button'>{cross}</div>
      </Link>
      <div className='filter-bar'>
        <h1 className='bot-header' style={{ margin: '0', width: 'auto' }}>
          Bot Wallet
        </h1>
      </div>
      <div
        className='bot-info no-border'
        style={{
          textTransform: 'none',
          width: '80%',
          textAlign: 'center',
          margin: '0 auto'
        }}
      >
        <span
          style={{ cursor: 'pointer' }}
          id='id-box'
          onClick={handleCopyText}
        >
          {botId}
        </span>
      </div>
      <div
        className='wallet-balance'
        style={{ justifyContent: 'center', marginTop: '100px' }}
      >
        <div className='info-refresh' style={{ alignItems: 'flex-end' }}>
          <div className='balance-div'>
            <p className='txt'>Balance</p>
            <p className='balance'>
              {balance > 0 ? balance / LAMPORTS_PER_SOL : 0} SOL
            </p>
          </div>

          <Button
            className='refresh-btn'
            type='submit'
            disabled={isDisabled}
            onClick={(e) => {
              e.preventDefault()
              setRefreshLoader(true)
              setDisabled(true)
              fetchBotWalletBalance(botId)
            }}
          >
            Refresh{' '}
            {showRefreshLoader ? (
              <span style={{ display: 'flex', marginLeft: '15px' }}>
                <CircularProgress
                  style={{ color: '#000' }}
                  className='progress-spinner'
                />
              </span>
            ) : null}
          </Button>
        </div>
      </div>
      <form className='bot-amount-form'>
        <TextField
          id='outlined-basic'
          name='name'
          placeholder='Amount'
          variant='outlined'
          required={true}
          fullWidth
          className='text-field deposit-field'
          value={amount}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^\d.]/g, '')
            setAmount(onlyNums)
          }}
        />
        <Button
          className='refresh-btn deposit-field-btn'
          type='button'
          onClick={(e) => {
            e.preventDefault()
            setDisabled(true)
            setDepositLoader(true)
            fetchUserWalletBalance()
          }}
        >
          Deposit{' '}
          {showDepositLoader ? (
            <span style={{ display: 'flex', marginLeft: '15px' }}>
              <CircularProgress
                style={{ color: '#000' }}
                className='progress-spinner'
              />
            </span>
          ) : null}
        </Button>
      </form>
      <div className='btn-center-div'>
        <Button
          variant='contained'
          className='my-btn submit-btn create-btn withDep-btn'
          type='submit'
          disabled={isDisabled}
          onClick={(e) => {
            e.preventDefault()
            setDisabled(true)
            setWithdrawLoader(true)
            createWithdrawRequest()
          }}
        >
          Withdraw{' '}
          {showWithdrawLoader ? (
            <span style={{ display: 'flex', marginLeft: '15px' }}>
              <CircularProgress
                style={{ color: '#000' }}
                className='progress-spinner'
              />
            </span>
          ) : null}
        </Button>
      </div>
    </Container>
  )
}

export default WithdrawRequest