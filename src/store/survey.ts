import { authApi } from './user';
import { defineStore } from 'pinia';

export interface Answer{
    text: string;
    question_index: number,
    survey_id: number;
    index: number,
    answered_total: number | null,
}

export interface Question{
    id: number;
    index: number;
    text: string;
    type: string;
    required: boolean
    properties: any;
    response_questions: any
}

// export interface ResponseQuestion{
//     id: number;
//     survey_id: number;
//     question_index: number;
//     answer_index: number;
// }

// export interface Response{
//     id: number;
//     survey_id: number;
//     response_questions: ResponseQuestion[]
// }

export interface Survey{
    id: string;
    folder_id: number;
    title: string;
    description: string;
    created_at:string;
    updated_at: string;
    questions: Question[],
    responses: any
}

interface folder {
    id: string;
    name: string;
    surveys: []
}

interface SurveyState{
    surveys: Survey[],
    survey: Survey,
    folders: folder[],
    folder: folder;
    folder_trashed: folder[]
    survey_trashed: Survey[]
}

const surveyStore = defineStore('survey', {
    state: () : SurveyState => ({
        surveys: [],
        survey: {} as Survey,
        folders: [],
        folder_trashed: [],
        survey_trashed: [],
        folder: {} as folder
    }),
    actions: {
        async getAll(){
            try{
                const response = await authApi.get('/surveys')
                this.surveys = response.data;
                //@ts-ignore
                this.surveys.questions = [];
                return response
            }catch(e){
                console.error(e)
            }
        },
        async store(title: string, description: string, folder_id: number){
            try{
                const response = await authApi.post('/surveys', {title, description, folder_id})
                this.surveys.push(response.data)
                if(folder_id){
                    //@ts-ignore
                    this.folder.surveys.push(response.data)
                }
                return response
            }catch(e){
                console.error(e)
            }
        },
        async update(edit: {title: string, description: string}){
            this.survey.title = edit.title;
            this.survey.description = edit.description;
            try{
                const response = await authApi.put('/surveys/' + this.survey.id, {...edit})
                return response;
            }catch(e){
                console.log(e)
            }
        },
        async addQuestion(question: any){
          try {
            const response = await authApi.post("/survey/" + this.survey.id + "/questions", {question});
            return response;
          } catch (e) {
            console.error(e);
          }
        },
        async deleteQuestion(questionIndex: number){
            try {
                const response = await authApi.delete(
                    "/survey/" + this.survey.id + "/questions/" + questionIndex
                );
                return response;
            } catch (e) {
                console.error(e);
            }
        },
        async updateQuestion(question: Question){
            try {
                const response = await authApi.put("/survey/" + this.survey.id + "/questions/" + question.id, {
                    text: question.text,
                    required: question.required ? 1 : 0,
                    properties: JSON.stringify(question.properties),
                });
                return response;
            } catch (e) {
                console.error(e);
            }
        },
        async getAllFolders(){
            try {
                const response = await authApi.get("/folders");
                this.folders = response.data
            } catch (e) {
                console.error(e);
            }
        },
        async addFolder(name: string){
            try {
                const response = await authApi.post("/folders", { name })
                this.folders.push(response.data)
                return response
              } catch (e) {
                console.error(e);
              }
        },
        async surveySoftDelete(survey_id: string){
            try {
                const response = await authApi.delete("/surveys/"+survey_id)
                this.surveys = this.surveys.filter(item => item.id != survey_id)
                return response
            } catch (e) {
                console.log(e);
                
            }
        },
        async folderSoftDelete(survey_id: string){
            try {
                const response = await authApi.delete("/folders/"+survey_id)
                this.folders = this.folders.filter(item => item.id != survey_id)
                return response
            } catch (e) {
                console.log(e);
                
            }
        },
        async getAllFolderTrashed(){
            try {
                //@ts-ignore
                const response = await authApi.get("/folders/", {params: {onlyTrashed: true}})
                this.folder_trashed = response.data
                return response
            } catch (e) {
                console.log(e);
                
            }
        },
        async getAllSurveyTrashed(){
            try {
                //@ts-ignore
                const response = await authApi.get("/surveys/", {params: {onlyTrashed: true}})
                this.survey_trashed = response.data
                return response
            } catch (e) {
                console.log(e);
                
            }
        },
        getAllTrashed(){
            this.getAllFolderTrashed();
            this.getAllSurveyTrashed();
        }
    },
    getters: {
        getCountQuestions: state => state.survey.questions.length,
        findSurveyById: state => (id: string) => state.surveys.find(item => item.id == id),
        numberOfTrashed: state => state.folder_trashed.length + state.survey_trashed.length
    }

})


export default surveyStore;