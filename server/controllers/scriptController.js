const Script = require('../models/script')
const path = require('path')
const fs = require('fs')

const run = (dir) => new Promise((success, failure) => {
    const { spawn } = require('child_process')    
    const start = Date.now()
    const program = spawn('python', [path.join(__dirname, '..', 'python', 'tester.py'), dir])
    program.stdout.on('data', (response) => success({ response, time: Date.now() - start }))
    program.stderr.on('data', (error) => failure(error.toString()))
})

const createScript = async (req, res) => {
    const { _id, type, description, code, args, language } = req.body
    console.log(args)
    try {
        if (process.env.NODE_ENV === 'production') throw new Error('Scripts can only be added in the devkit')
        const target = await Script.findById(_id)
        if (target) throw new Error('Script already exists')
        let script = new Script({ _id, type, description, code, args, language })
        script = await script.save()
        return res.status(200).json(script)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const getScriptById = async (req, res) => {
    const { _id } = req.params
    Script.findById(_id).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const getScripts = async (req, res) => {
    let query = { ...req.query }, reserved = ['sort', 'skip', 'limit'], pipeline = []
    reserved.forEach((el) => delete query[el])

    pipeline.push({ $match: query })
    if (req.query.sort) pipeline.push({ $sort: getSort(req.query.sort) })
    pipeline.push({ 
        $project: {
            password: 0
        }
    })
    
    // paginate pipeline facet
    pipeline.push({
        $facet: {
            data: function paginate () {
                let data = []
                if (req.query.skip) data.push({ $skip: Number(req.query.skip) })
                if (req.query.limit) data.push({ $limit: Number(req.query.limit) })
                return data
            } (),
            summary: [{ $count: 'count' }]
        }
    })

    //paginate pipeline count removal
    pipeline.push({
        $project: {
            data: '$data',
            summary: { $arrayElemAt: [ "$summary", 0 ]}
        }
    })

    Script.aggregate(pipeline).then((response) => {
        return res.status(200).json({ ...response[0], summary: { count: response[0].summary ? response[0].summary.count : 0, has_more: (Number(req.query.skip) || 0) + (Number(req.query.limit) || 0) < (response[0].summary ? response[0].summary.count : 0) }})    
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const runScript = async (req, res) => {
    const { _id } = req.params

    try { 
        const target = await Script.findById(_id)
        if (!target) throw new Error('Script does not exist')
        let dir = path.join(__dirname, '..', '..', 'tmp', _id);
        let file = path.join(dir, 'solver.py')
        if (!fs.existsSync(dir)) fs.mkdirSync(dir)
        fs.writeFileSync(file, target.code)
        fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(req.body))
        let response = await run(dir)
        fs.rmSync(dir, { recursive: true, force: true });
        return res.status(200).json({ response: response.response.toString(), time: response.time })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message || error })
    }

}

module.exports = {
    createScript,
    getScriptById,
    getScripts,
    runScript
}