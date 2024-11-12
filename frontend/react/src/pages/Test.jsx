import { useEffect, useState } from 'react';
import {getUserProfilePictureUrl} from "../services/client.js";


export default function UserProfilePicture(userId) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const url = await getUserProfilePictureUrl(userId);
                setImageUrl(url);
            } catch (e) {
                console.error("Error loading profile image:", e);
            }
        };

        fetchProfileImage();

        // Cleanup the object URL when the component unmounts
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [userId]);

    return imageUrl
}
