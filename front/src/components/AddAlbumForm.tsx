import React, { FormEvent } from "react";

type AddAlbumFormProps = {
    addAlbum: (event: FormEvent<HTMLFormElement>) => Promise<false | undefined>
};

const AddAlbumForm: React.FunctionComponent<AddAlbumFormProps> = ({ addAlbum }) => {
    return (
        <form onSubmit={addAlbum}>
            <h2>Add album</h2>

            <label>
                Title:
                <input type="text" name="albumTitle" />
            </label>

            <label>
                Price:
                <input type="text" name="albumPrice" />
            </label>

            <label>
                Quantity:
                <input type="text" name="albumQty" />
            </label>

            <input type="submit" value="Add!" />
        </form>
    );
};

export default AddAlbumForm;