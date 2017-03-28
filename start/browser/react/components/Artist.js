import React from 'react';
import { Link } from 'react-router';

export default class Artist extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const artistId = this.props.routeParams.artistId;
        const selectAlbum = this.props.selectAlbum;

        axios.get(`/api/artists/${artistId}`)
        .then(res => res.data)
        .then(album => this.onLoad(convertAlbums(album)));
    }
    
    render() {
        return (
            <div>
                <h3>ARTIST NAME</h3>
                <h4>ALBUMS</h4>
                <h4>SONGS</h4>
            </div>
        )
    }

}


