import { useState } from 'react'
import axios from 'axios'

const HELX_SEARCH_URL = `https://search.helx-dev.renci.org/search`

export const useSearch = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [results, setResults] = useState([])
    const [totalItems, setTotalItems] = useState(0)

    const fetchResults = async (query, currentPageNumber, perPage) => {
        setResults([])
        setIsLoading(true)
        setError(null)
        await axios.post(HELX_SEARCH_URL, {
            index: 'test',
            query: query,
            offset: perPage * currentPageNumber,
            size: perPage,
        })
        .then(response => {
            const hits = response.data.result.total_items === 0 ? [] : response.data.result.hits.hits
            // const hitsWithStudyProperty = hits.filter(hit => hit._source.hasOwnProperty('study'))
            // setResults(hitsWithStudyProperty)
            setResults(hits)
            setTotalItems(response.data.result.total_items)
            setIsLoading(false)
        })
        .catch(error => {
            setIsLoading(false)
            console.error(error.message)
            setError('There was an error fetching data')
        })
    }

    return { isLoading, error, results, totalItems, fetchResults }
}