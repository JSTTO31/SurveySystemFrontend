import { defineStore } from "pinia";
import { authApi } from "./user";


const discussionStore = defineStore('discussion', {
    state: () => ({
        discussions: []
    }),
    actions: {
        async getAll(){
            try {
                const response = await authApi.get('/discussions');
                this.discussions = response.data
            } catch (error) {
                console.log(error);
                
            }
        },
        async addDiscussion(title: string, paragraph: string){
            try {
                const response = await authApi.post('/discussions', {title, paragraph});
                this.discussions.shift(response.data)
            } catch (error) {
                console.log(error);
            }
        }
    }
})

export default discussionStore