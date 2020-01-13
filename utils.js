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
async function editHook(projectId,hook,url,token) {
    try {
        let hookId=hook.hookId
        let hookURL=hook.url
        let newURL=hookURL.replace(/(?:^https?:\/\/([^\/]+)(?:[\/,]|$)|^(.*)$)/,url)
        console.log(hookId)
        console.log(newURL)
        const response= await axios.put(`https://gitlab.com/api/v4/projects/${projectId}/hooks/${hookId}?access_token=${token}`,{
            url:newURL
        })

    }catch(err) {
        console.log(err)
    }
}
