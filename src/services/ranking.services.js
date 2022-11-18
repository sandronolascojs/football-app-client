import axios from 'axios'

export const getAllTeamsByRanking = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/teams?ranking=-1`)
        // const response = await axios.get('http://localhost:4000/api/v1/teams?ranking=-1')
        return response.data
    } catch (err) {
        err.response.data
    }
}