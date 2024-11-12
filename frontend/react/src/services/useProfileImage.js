import { useEffect, useState, useCallback, useRef } from "react";
import { getUserProfilePictureUrl } from "./client.js";

export const useProfileImage = (userId) => {
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const imageBlobUrlRef = useRef(null);
    const previousUserIdRef = useRef(null);

    const fetchProfileImage = useCallback(async () => {
        // Skip fetch if userId is undefined or if it's the same as previous
        if (!userId || userId === previousUserIdRef.current) {
            return;
        }

        // Update previous userId to the current one
        previousUserIdRef.current = userId;

        try {
            const response = await getUserProfilePictureUrl(userId);

            // Revoke the old URL if it exists
            if (imageBlobUrlRef.current) {
                URL.revokeObjectURL(imageBlobUrlRef.current);
            }

            // Create a new blob URL and update both the ref and state
            const newImageUrl = URL.createObjectURL(response.data);
            imageBlobUrlRef.current = newImageUrl;
            setProfileImageUrl(newImageUrl);
        } catch (error) {
            console.error("Failed to fetch profile image:", error);
        }
    }, [userId]);

    useEffect(() => {
        fetchProfileImage();

        // Cleanup on component unmount
        return () => {
            if (imageBlobUrlRef.current) {
                URL.revokeObjectURL(imageBlobUrlRef.current);
            }
        };
    }, [fetchProfileImage]);

    return { profileImageUrl, fetchProfileImage };
};
