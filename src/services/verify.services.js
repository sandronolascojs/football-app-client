import axios from 'axios'
import { config } from '../config/config'

const {env} = config

export const verifyEmail = async(token) => {
    try {
        const response = await axios.get(`${env.backendApiUrl}/api/v1/account/verify`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}