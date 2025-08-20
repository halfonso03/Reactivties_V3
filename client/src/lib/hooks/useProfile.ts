import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";
import { EditProfileSchema } from "../schemas/editProfileSchema";

export const useProfile = (id?: string) => {
	const queryClient = new QueryClient();

	const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
		queryKey: ["profile", id],
		staleTime: 0,
		queryFn: async () => {
			const response = await agent.get<Profile>(`/profiles/${id}`);
			return response.data;
		},
		enabled: !!id,
	});

	const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
		queryKey: ["photos", id],
		queryFn: async () => {
			const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
			return response.data;
		},
		enabled: !!id,
	});

	const editProfile = useMutation({
		mutationFn: async (profile: EditProfileSchema) => {
			await agent.put(`/profiles`, profile);
		},
		onMutate: async (profile) => {
			await queryClient.cancelQueries({
				queryKey: ["profile", id],
			});

			const prevActivity = queryClient.getQueryData(["profile", id]);

			console.log("prevActivity", prevActivity, id, profile);

			await queryClient.setQueryData(
				["profile", id],
				(oldProfile: Profile) => {
					console.log("id", id);
					console.log("data", oldProfile);
					if (!oldProfile) return oldProfile;
					return {
						...oldProfile,
						displayName: profile.displayName,
						bio: profile.bio,
					};
				}
			);
			await queryClient.setQueryData(["user"], (userData: User) => {
				if (!userData) return userData;
				return {
					...userData,
					displayName: profile.displayName,
				};
			});
		},
	});

	const uploadPhoto = useMutation({
		mutationFn: async (file: Blob) => {
			const formData = new FormData();
			formData.append("file", file);
			const response = await agent.post("/profiles/add-photo", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			return response.data;
		},
		onSuccess: async (photo: Photo) => {
			await queryClient.invalidateQueries({
				queryKey: ["photos", id],
			});
			queryClient.setQueryData(["user"], (data: User) => {
				if (!data) return data;
				return { ...data, imageUrl: data.imageUrl ?? photo.url };
			});
			queryClient.setQueryData(["profile", id], (data: Profile) => {
				if (!data) return data;
				return { ...data, imageUrl: data.imageUrl ?? photo.url };
			});
		},
	});

	const setMainPhoto = useMutation({
		mutationFn: async (photo: Photo) => {
			console.log(`/profiles/${photo.id}/setMain`);
			await agent.put(`/profiles/${photo.id}/setMain`);
		},
		onSuccess: (_, photo) => {
			queryClient.setQueryData(["user"], (userData: User) => {
				if (!userData) return userData;
				return {
					...userData,
					imageUrl: photo.url,
				};
			});
			queryClient.setQueryData(["profile", id], (profile: Profile) => {
				if (!profile) return profile;
				return {
					...profile,
					imageUrl: photo.url,
				};
			});
		},
	});

	const deletePhoto = useMutation({
		mutationFn: async (photoId: string) => {
			await agent.delete(`/profiles/${photoId}/photos`);
		},
		onSuccess: (_, photoId) => {
			queryClient.setQueryData(["photos", id], (photos: Photo[]) => {
				return photos?.filter((x) => x.id !== photoId);
			});
		},
	});

	const isCurrentUser = useMemo(() => {
		return id === queryClient.getQueryData<User>(["user"])?.id;
	}, [id, queryClient]);

	return {
		profile,
		loadingProfile,
		photos,
		loadingPhotos,
		isCurrentUser,
		uploadPhoto,
		setMainPhoto,
		deletePhoto,
		editProfile,
	};
};
