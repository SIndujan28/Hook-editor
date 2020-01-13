const inquirer=require('inquirer')

//  const getGroups=require('./git').getGroups
const getProjects=require('./utils').getProjects
const getHooks=require('./utils').getHooks
const editHook=require('./utils').editHook
 function GLHookEditor() {
inquirer.prompt([{
    type:'text',
    name:'groupID',
    message:'Enter the group id',
    validate:function(value) {
        if(!isNaN(value)) {
            return true
        }
        return 'Enter a valid group id number'
    }
},{
    type:'password',
    name:'access_token',
    message:"Enter the access token"

}]).then(async (answers) => {
    let groupId=answers.groupID
    let access_token=answers.access_token
    const response=await getProjects(groupId,access_token)
    let projectList=[]
    let projects=response.map(item => {
        console.log(item.id,item.path_with_namespace)
        projectList.push({name:item.id})
        return item.id
    })
    // console.log(projects,projectList)
    inquirer.prompt([{
        type:'checkbox',
        message:'Select the required projects',
        name:'projectList',
        choices:projectList
    }]).then(async (answers) => {
        let projects=answers.projectList
        // console.log(answers.projectList,projects)
        let hooks=[]
        for (var i=0;i < projects.length;i++) {
            let r=await getHooks(projects[i],access_token)
            let hookpp=r.map((item) => {
                console.log(item.id,item.url)
                return { hookId:item.id,url:item.url}
            })
            hooks.push({projectId:projects[i],hooks:hookpp})
        }
        // console.log("+++++"+hooks)
        // hooks.forEach(element => {
        //     console.log(element.projectId,element.hooks)
            
        // });
        inquirer.prompt([{
            type:'text',
            message:'Enter the url to be searched',
            name:'searchURL'
        },{
            type:'text',
            message:'Enter the url to be replaced',
            name:'replaceURL'
        }]).then((answers) => {
            let searchURL=answers.searchURL
            let replaceURL=answers.replaceURL
            for (var i=0;i < hooks.length;i++) {
                let pId=hooks[i].projectId
                let hpp=hooks[i].hooks
                for (var j=0;j < hpp.length;j++) {
                    editHook(pId,hpp[j],searchURL,replaceURL,access_token)
                }
            }

        })
        // projects.forEach(async (project) => {
        //     let response=await getHooks(project,access_token)
        //     let hookperproject=response.map((item) => {
        //         console.log(item.id,item.url)
        //         return item.id
        //     })
        //        hooks.push({projectId:project,hooks:hookperproject})
        //     console.log(hooks)
        // });
        // console.log("+++++"+hooks)
    })
})
}
module.exports=GLHookEditor