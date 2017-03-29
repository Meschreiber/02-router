import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class Artist extends React.Component {

    componentDidMount() {
        const artistId = this.props.routeParams.artistId;
        const selectArtist = this.props.selectArtist; // this is a method
       
        selectArtist(artistId);

        console.log('artistId: ',artistId, 'selectArtist: ', selectArtist)

    }
    
    render() {
        
        const artist = this.props.selectedArtist

        console.log(this.props)
        return (
            <div>
                <h3>{artist.name}</h3>
                <h4>ALBUMS</h4>
                {/*<Link to={`/api/artists/${artist.id}/albums`} />*/}
                <h4>SONGS</h4>
                {/*<Link to={`/api/artists/${artist.id}/songs`} />*/}
            </div>
        )
    }

}



