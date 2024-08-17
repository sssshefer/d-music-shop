import React from "react";
import { AlbumProps } from "@/app/types/AlbumProps";

type AlbumsListProps = {
    albums: AlbumProps[],
    handleBuyAlbum: any
};

const AlbumsList: React.FunctionComponent<AlbumsListProps> = ({ albums, handleBuyAlbum }) => {

    const availableAlbums = () => {
        const albumsList = albums.map((album) => {
            return (
                <li key={album.uid}>
                    {album.title} (#{album.index.toString()})<br />
                    Price: {album.price.toString()}
                    <br />
                    Items left: {album.quantity.toString()}
                    <br />
                    {BigInt(album.quantity) > BigInt(0) && (
                        <button onClick={(e) => handleBuyAlbum(album, e)}>
                            Buy 1 copy
                        </button>
                    )}
                </li>
            );
        });
        return albumsList;
    };

    return (
        <div >
            {albums.length > 0 && <ul>{availableAlbums()}</ul>}
        </div>
    );
}
export default AlbumsList;