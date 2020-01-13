const axios=require('axios')

async function getProjects(groupId,token) {
    try{
        const response= await axios.get(`https://gitlab.com/api/v4/groups/${groupId}/projects?access_token=${token}`)
        return response.data
    }catch(err) {
        console.log(err)
    }
}

async function getHooks(projectId,token) {
    try{
        const response= await axios.get(`https://gitlab.com/api/v4/projects/${projectId}/hooks?access_token=${token}`)
        return response.data
    }catch(err) {
        console.log(err)
    }
}

async function getGroups(token) {
    try{
        const response= await axios.get(`https://gitlab.com/api/v4/groups?access_token=${token}`)
        return response.data
    }catch(err) {
        console.log(err)
    }
}
