import { URLS } from '@/constants/urls';

import { api } from '../api';
import { UploadAvatarData } from './types';

const profileApi = api.injectEndpoints({
    endpoints: (build) => ({
        updateProfile: build.mutation<unknown, UploadAvatarData>({
            query: ({
                username,
                avatar,
                name,
                surname,
                bio,
                currentUsername,
            }) => {
                const formData = new FormData();
                formData.append('avatar', avatar ?? '');
                formData.append('username', username);
                formData.append('name', name);
                formData.append('surname', surname);
                formData.append('bio', bio);

                return {
                    url: URLS.generateUpdateProfile(currentUsername),
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const { useUpdateProfileMutation } = profileApi;
