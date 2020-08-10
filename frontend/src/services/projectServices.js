import axios, { HOST } from "../utils/httpUtilities";

const GET_PROJECTS_ENDPOINT = `${HOST}/project/list`;
const PROJECT_DETAIL_ENDPOINT = `${HOST}/project`;
const ADD_PROJECT_ENDPOINT = `${HOST}/project/add`;

export function getAllProjects(payload) {
    return axios.get(`${GET_PROJECTS_ENDPOINT}/${payload.userId}`);
}

export function deleteProject(projectId) {
    return axios.delete(`${PROJECT_DETAIL_ENDPOINT}`, { 
        data: {
            id: projectId
        }
    });
}

export function addProject(payload) {
    return axios.post(`${ADD_PROJECT_ENDPOINT}`, payload);
}

export function detailProject(projectId) {
    return axios.get(`${PROJECT_DETAIL_ENDPOINT}/${projectId}`);
}

export function updateProject(payload) {
    return axios.put(`${PROJECT_DETAIL_ENDPOINT}`, payload);
}


