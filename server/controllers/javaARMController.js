const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec    

const compileCompiler = () => new Promise((success, failure) => {
    return exec('make', { 
        cwd: path.join(__dirname, '..', 'compiler')
    }, (error, stdout, stderr) => {
        if (error) return failure(stderr.toString())
        return success(stdout.toString())
    })
})

const compileJava = async (dir) => new Promise((success, failure) => {
    const baseline = Date.now()
    return exec(`./codegen ${dir}`, {
        cwd: path.join(__dirname, '..', 'compiler')
    }, (error, stdout, stderr) => {
        if (error) return failure(stderr.toString())
        return success({ response: stdout.toString(), time: Date.now() - baseline })
    })
})

const compileCode = async (req, res) => {
    try { 
        let tmp = path.join(__dirname, '..', '..', 'tmp')
        let dir = path.join(tmp, Date.now().toString())
        let file = path.join(dir, 'expr.java')
        if (!fs.existsSync(tmp)) fs.mkdirSync(tmp)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir)
        fs.writeFileSync(file, req.body.code)
        fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(req.body))
        const compile = await compileJava(file)
        const response = fs.readFileSync(path.join(dir, 'expr.s'))
        fs.rmSync(dir, { recursive: true, force: true });
        return res.status(200).json({ response: response.toString(), time: compile.time })
    } catch (error) {
        return res.status(400).json({ error: error.message || error })
    }
}

module.exports = {
    compileCompiler,
    compileCode
}