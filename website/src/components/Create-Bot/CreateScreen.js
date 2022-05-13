import React, { useEffect, useState, useCallback } from 'react'
import {
  Container,
  Button,
  FormGroup,
  TextField,
  CircularProgress
} from '@mui/material'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { cross, headerBot, sectionCross } from '../../utils/svg'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import {
  Connection,
  SystemProgram,
  clusterApiUrl,
  Transaction,
  PublicKey
} from '@solana/web3.js'

const CreateScreen = (props) => {
  const location = useLocation()
  const [amount, setAmount] = useState('')
  const [isDisabled, setDisabled] = useState(false)
  const [showDepositLoader, setDepositLoader] = useState(false)
  const [showRefreshLoader, setRefreshLoader] = useState(false)
  const [showSubmitLoader, setSubmitLoader] = useState(false)

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
    fetchWalletBalance()
  }, [])

  const [balance, setBalance] = useState(0)
  const history = useHistory()
  const { data, botId } = props?.location?.state || {}

  const handleCopyText = () => {
    const selectText = document.getElementById('id-box')
    navigator.clipboard.writeText(selectText.innerText)
    toast.success('Text Copied')
  }

  const fetchWalletBalance = async () => {
    var url = 'https://api.mainnet-beta.solana.com/'

    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const wallet = JSON.parse(`${xhr.responseText}`)

        setBalance(wallet?.result?.value || 0)
        setRefreshLoader(false)
      } else {
        setRefreshLoader(false)
      }
    }

    let query = {
      jsonrpc: '2.0',
      id: '1',
      method: 'getBalance',
      params: [`${botId}`]
    }

    var data = JSON.stringify(query)

    xhr.send(data)
  }

  const fetchBalance = async () => {
    var url = 'https://api.mainnet-beta.solana.com/'

    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const wallet = JSON.parse(`${xhr.responseText}`)
        if (
          wallet?.result?.value &&
          wallet?.result?.value > 0 &&
          wallet?.result?.value / 1000000000 > amount
        ) {
          depositAmount()
        } else {
          setDisabled(false)
          setDepositLoader(false)
          setAmount('')
          toast.error('Insufficient Balance')
        }
        return false
      }
    }

    const jwt = Cookies.get('auth-jwt')
    let query = {
      jsonrpc: '2.0',
      id: '1',
      method: 'getBalance',
      params: [`${jwt.pubkey}`]
    }
    var data = JSON.stringify(query)
    xhr.send(data)
  }

  const depositAmount = async () => {
    if (amount && amount !== '' && amount !== 0) {
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
              lamports: amount * 1000000000
            })
          )

          transaction.feePayer = wallet.publicKey

          let { blockhash } = await connection.getRecentBlockhash()

          transaction.recentBlockhash = blockhash

          let signed = ''
          try {
            signed = await window.solana.signTransaction(transaction)
          } catch (err) {
            toast.error('Transaction did not succed. Please try again.')
          }

          let txid = ''
          try {
            txid = await connection.sendRawTransaction(signed.serialize())
          } catch (err) {
            toast.error('Transaction did not succed. Please try again.')
          }

          try {
            await connection.confirmTransaction(txid)
            toast.success('Deposited successfull.')
            setAmount('')
            setDepositLoader(false)
            setDisabled(false)
          } catch (err) {
            setDisabled(false)
            setDepositLoader(false)
            toast.error('Transaction did not succed. Please try again.')
          }
        } catch (err) {}
      } else {
        setAmount('')
        setDepositLoader(false)
        setDisabled(false)
        window.open('https://phantom.app/', '_blank')
      }
    } else {
      setAmount('')
      setDepositLoader(false)
      setDisabled(false)
      toast.error('Please enter some amount.')
    }
  }

  return (
    <>
      <Container
        className='container-marg-top animate__animated animate__fadeInUp'
        id='collection-view'
      >
        <div className='cross-button'>
          <Link
            to={{
              pathname: '/manage-bot'
            }}
          >
            {cross}
          </Link>
        </div>
        <div className='filter-bar'>
          <h1 className='bot-header' style={{ margin: '0' }}>
            <span>{headerBot}</span>
            {location?.search === '?update-bot' ? 'Update Bot' : 'Create Bot'}
          </h1>
        </div>
        <div className='bot-info'>
          <span
            style={{ color: '#fff', textTransform: 'none', cursor: 'pointer' }}
            onClick={handleCopyText}
            id='id-box'
          >
            {botId}
          </span>{' '}
        </div>
        <div className='wallet-balance'>
          <div className='info-refresh' style={{ alignItems: 'flex-end' }}>
            <div className='balance-div'>
              <p className='txt'>Balance</p>
              <p className='balance'>
                {balance !== 0 ? balance / 1000000000 : 0} SOL
              </p>
            </div>

            <Button
              className='refresh-btn'
              type='button'
              onClick={(e) => {
                setRefreshLoader(true)
                fetchWalletBalance(botId)
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
              fetchBalance()
            }}
            disabled={isDisabled}
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
            onClick={(event) => {
              history.push({
                pathname: '/bot-activation',
                state: {
                  data,
                  botId,
                  botBalance: balance
                }
              })
            }}
          >
            Next{' '}
            {showSubmitLoader ? (
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
    </>
  )
}

export default CreateScreen
