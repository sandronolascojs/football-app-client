import React, {useEffect, useState} from 'react'
import {verifyEmail } from '../../../services/verify.services'
import { Link } from 'react-router-dom'

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        backgroundImage: 'url("/estadio.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '32px',
        padding: '54px',
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        gap: '54px',
        borderRadius: '8px',
    },
    loadingText: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#000'
    },
    errorText: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#f00'
    },
    successfullMessage: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#0f0'
    },
    linkHome: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#fff',
        textDecoration: 'none',
        backgroundColor: '#696969',
        padding: '8px',
        borderRadius: '8px'
    }
}

export const Verify = () => {
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)
    const [message, setMessage ] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        return async () => {
            const token = window.location.href.split('token=')[1]
            setToken(token)
            const url = window.location.href.split('?')[0]
            

            const replyFromVerifyEmail = await verifyEmail(token)
            if (replyFromVerifyEmail.error) {
                setError(true)
                setMessage(replyFromVerifyEmail.message)
            }
            else {
                const verifiedMessage = replyFromVerifyEmail.message === 'User verified' ? 'Email verified successfully' : replyFromVerifyEmail.message
                setMessage(verifiedMessage)
            }
            
            setLoading(false)
        }
    }, [token])

  return (
    <div style={styles.container}>
            {loading && <h1 style={styles.loadingText}>Loading...</h1>}
            {error && <div style={styles.contentWrapper}>
                    <h1 style={styles.errorText}>{message}</h1>
                    <Link to="/" style={styles.linkHome}>Go to Home</Link>
                </div>}
            {!error && !loading && <div style={styles.contentWrapper}>
                    <h1 style={styles.successfullMessage}>{message}</h1>
                    <Link to="/" style={styles.linkHome}>Go to Home</Link>
                </div>
                }
        </div>
  )
}
