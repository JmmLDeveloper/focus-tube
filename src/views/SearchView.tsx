import React, { useState } from 'react';
import { getSearchVideos } from '../utils/services';
import VideoPreview from '../components/VideoPreview'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

import '../styles/SearchView.css'

function SearchView() {
    const [searchText, setSearchText] = useState('')
    const [videosIds, setVideosIds] = useState<Array<string>>([])
    const [initialFetch, setInitialFetch] = useState(false)
    const [loading, setLoading] = useState(false)

    const submit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        setLoading(true)
        let response = await getSearchVideos(searchText);
        let ids = response.items.map((item) => item.id.videoId)
        setVideosIds(ids)
        setLoading(false)
        setInitialFetch(true)
        setSearchText('')
    }

    return (
        <div id="app">
            <form onSubmit={submit} id="search-form">
                <TextField
                    id="search-input"
                    value={searchText}
                    onChange={(ev) => setSearchText(ev.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">Default</Button>
            </form>
            <div id="search-results">
                {
                    loading ?
                        <p> esta cargando mi pana </p>
                        : initialFetch ?
                            videosIds.map(id => <VideoPreview key={id} id={id} />)
                            :
                            <p> no intial fetch yet </p>
                }
            </div>
        </div>
    );
}

export default SearchView
