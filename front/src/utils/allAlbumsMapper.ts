import { MusicShop } from "@/typechain"
import { AlbumProps } from "@/app/types/AlbumProps";

export function allAlbumsMapper(albums: MusicShop.AlbumStructOutput[]): AlbumProps[] {
    return albums.map(
        (album): AlbumProps => {
            return {
                index: album[0].toString(),
                uid: album[1],
                title: album[2],
                price: album[3],
                quantity: album[4],
            };
        })
}