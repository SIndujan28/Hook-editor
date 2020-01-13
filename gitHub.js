const inquirer=require('inquirer')
const getRepos=require('./utils').getRepos
const githubHooks=require('./utils').githubHooks
const editGHook=require('./utils').editGHook

 function GhHookEditor() { 
inquirer.prompt([{
    type:'text',
    name:'groupName',
    message:'Enter the group name'
},{
    type:'text',
    name:'access_token',
    message:'Enter the access token'
}]).then(async (answers) => {
    let groupName=answers.groupName
    const access_token=answers.access_token
    let repos=await getRepos(groupName,access_token)
    let repoList=[]
    console.log(Array.isArray(repos))
    let repoName=repos.map((item) => {
        console.log("Name: "+item.name,"full_name: "+item.full_name)
        repoList.push({name:item.name})
        return item.name
    })
    inquirer.prompt([{
        type:'checkbox',
        name:'selected_repos',
        message:'Select the required repositories',
        choices:repoList
    }]).then(async (answers) => {
        let selected_repos=answers.selected_repos
        let hooks=await Promise.all(selected_repos.map(async(item) => {
            const hpp= await githubHooks(groupName,item,access_token)
            const low=hpp.map((el) => {
                return {id:el.id,url:el.config.url}
            })
            console.log(low)
            return {name:item,hooks:low}
        }))

         console.log(hooks)
         inquirer.prompt([{
             type:'text',
             name:'searchURL',
             message:'Enter the URL to be searched'
         },{
             type:'text',
             name:'replaceURL',
             message:'Enter the url to be replace'
         }]).then((answer)=>{
             let searchURL=answer.searchURL
             let replaceURL=answer.replaceURL
             for (var i=0;i < hooks.length;i++) {
                let repoName=hooks[i].name
                let hpp=hooks[i].hooks
                for (var j=0;j < hpp.length;j++) {
                    editGHook(groupName,repoName,hpp[j],searchURL,replaceURL,access_token)
                }
            }
         })
    })
})
}
module.exports=GhHookEditor