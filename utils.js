const axios=require('axios')

async function getProjects(groupId,token) {
    try{
        const response= await axios.get(`https://gitlab.com/api/v4/groups/${groupId}/projects?access_token=${token}`)
        return response.data
    }catch(err) {
        console.error(err.errno)
    }
}
async function getRepos(groupName,token) {
    try {
        const response=await axios.get(`https://api.github.com/orgs/${groupName}/repos`,{ headers: { Authorization:`token ${token}`}})
        return response.data
    }catch(err) {
        console.error(err)
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
async function githubHooks(groupName,repoName,token) {
    try{
        const response=await axios.get(`https://api.github.com/repos/${groupName}/${repoName}/hooks`,{ headers: { Authorization:`token ${token}`}})
        return response.data
    }catch(err) {
        console.error(err)
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
async function editHook(projectId,hook,searchURL,replaceURL,token) {
    try {
        let hookId=hook.hookId
        let hookURL=hook.url
        if(!hookURL.includes(searchURL))
        {
            return
        }
        let newURL=hookURL.replace(/(?:^https?:\/\/([^\/]+)(?:[\/,]|$)|^(.*)$)/,replaceURL)
        console.log(hookId)
        console.log(newURL)
        const response= await axios.put(`https://gitlab.com/api/v4/projects/${projectId}/hooks/${hookId}?access_token=${token}`,{
            url:newURL
        })

    }catch(err) {
        console.error(err)
    }
}
async function editGHook(orgName,repoName,hook,searchURL,replaceURL,token) {
    try {
        let hookId=hook.id
        let hookURL=hook.url
        if(!hookURL.includes(searchURL))
        {
            return
        }
        let newURL=hookURL.replace(/(?:^https?:\/\/([^\/]+)(?:[\/,]|$)|^(.*)$)/,replaceURL)
        console.log(hookId)
        console.log(newURL)
        const response=await axios({
            method: 'patch',
            url:`https://api.github.com/repos/${orgName}/${repoName}/hooks/${hookId}`,
            headers: { Authorization:`token ${token}`},
            data: {
                config:{
                    url:newURL
                }
            }
        })
    }catch(err) {
        console.error(err)
    }
}
function filterFunction(array,regEx) {
    const result=array.filter(item => item.url.includes(regEx))
    console.log('hi')
    return result
}

module.exports={
    getGroups:getGroups,
    getProjects:getProjects,
    getHooks:getHooks,
    editHook:editHook,
    filterFunction:filterFunction,
    getRepos:getRepos,
    githubHooks:githubHooks,
    editGHook:editGHook
}
