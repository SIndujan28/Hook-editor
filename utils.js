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
function filterFunction(array,regEx) {
    const result=array.filter(item => item.url.includes(regEx))
    console.log('hi')
    return result
}
// getGroups('SH7bWx9L86yBaNbvasAy')
// getProjects('6895746','SH7bWx9L86yBaNbvasAy')
//  getHooks('16250563','SH7bWx9L86yBaNbvasAy').then(response => filterFunction(response,'1569879'))

// console.log(Array.isArray(response))
// filterFunction(response,'1569879')
//  editHook('16250563','1569875','http://hola.com','SH7bWx9L86yBaNbvasAy')

// let token='SH7bWx9L86yBaNbvasAy'
//     getGroups(token)
//         .then((data) => {
//             data.forEach(group => {
//                 getProjects(group.id,token)
//                     .then((projects) => {
//                         projects.forEach(project => {
//                             getHooks(project.id,token)
//                                 .then((hooks) => {
//                                     hooks.forEach(hook => {
//                                         const result=filterFunction(hooks,'ambi')
//                                         console.log(result)
//                                             result.forEach((item) =>editHook(project.id,item.id,'http://tortoise.com',token) )
//                                         // editHook(project.id,hook.id,'http://socialism.com',token)
//                                     });
//                                 })
//                         });
//                     })
//             });
//             })

module.exports={
    getGroups:getGroups,
    getProjects:getProjects,
    getHooks:getHooks,
    editHook:editHook,
    filterFunction:filterFunction
}
