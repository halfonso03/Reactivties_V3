import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { runInAction } from 'mobx';
import { useLocalObservable } from "mobx-react-lite"
import { useEffect, useRef } from 'react';

export const useComments = (activityId?: string) => {

    const connectedRef = useRef(false);

    const commentStore = useLocalObservable(() => ({
        comments: [] as ChatComment[],
        hubConnection: null as HubConnection | null,
        createHubConnection(activityId: string) {
            if (!activityId) return;

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_COMMENTS_URL}?activityId=${activityId}`, {
                    withCredentials: true,

                })
                .withAutomaticReconnect()
                .build();

            this.hubConnection.start().catch(error => console.log('Error stablishing connection', error))

            this.hubConnection.on("LoadComments", comments => {
                runInAction(() => this.comments = comments);
            })

            this.hubConnection.on("ReceiveComment", comment => {
                runInAction(() => this.comments.unshift(comment));
            })
        },
        stopHubConnection() {
            if (this.hubConnection?.state == HubConnectionState.Connected) {
                this.hubConnection.stop().catch(error => console.log('Error stopping connection', error))
            }
        }
    }));



    useEffect(() => {
        if (activityId) {
            if (!connectedRef.current) {
                commentStore.createHubConnection(activityId);
                connectedRef.current = true;
            }
        }
        return () => { commentStore.stopHubConnection(); commentStore.comments = []; }
    }, [activityId, commentStore]);

    return { commentStore };

}