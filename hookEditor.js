const inquirer=require('inquirer')
const GLHookEditor=require('./gitlab')
const GhHookEditor=require('./gitHub')

inquirer.prompt([{
    type:'text',
    message:'Type gitHub or gitLab to edit hooks',
    name:'choice',
    
}]).then((answer) => {
    let choice=answer.choice.toLowerCase()
    if(choice=='gitlab') {
        GLHookEditor()
    }
    if(choice=='github') {
        GhHookEditor()
    }
})