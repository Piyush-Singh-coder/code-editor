import Execution from "../model/execution.js";
import axios from "axios";

export const execute = async(req, res) => {
    try {
        const {language, code, version, input} = req.body;

        if (!language || !code || version === undefined){
            return res.status(400).json({message: "All the fields are required"});
        }

        const response = await axios.post(process.env.PISTON_URL, {
            language,
            version,
            files: [
                {name: "main",
                content: code
                }
            ],
            stdin: input || "",
            args: [],
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1
        });

        const result = response.data.run;

        res.status(200).json({output: result.stdout,
            error: result.stderr,
            exitCode: result.code
        });

    } catch (error) {
        console.error("error in execute controller:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const saveExecution = async(req, res) => {

    const user = req.user;

    const {language, code, output} = req.body;
    
    try {
        if (!code){
            return res.status(400).json({message: "Code is required"});
        }
        if (!output){
            return res.status(400).json({message: "Output is required"});
        }
        
        const execution = new Execution({
            user: user._id,
            language,
            code,
            output,
        });
        
        await execution.save();

        res.status(200).json({message: "Code is saved Successfully"});
    } catch (error) {
        console.error("error in saveExecution controller:", error);

        res.status(500).json({message: "Internal server error"});
    }
}


export const getExecutions = async(req, res) => {
    const user = req.user;

    try {
        const executions = await Execution.find({user: user._id}).sort({createdAt: -1});

        res.status(200).json({executions});
    } catch (error) {
        console.error("error in getExecutions controller:", error);

        res.status(500).json({message: "Internal server error"}); 
    }
}

export const getExecutionById = async(req, res) => {
    const {executionId} = req.params;

    try {
        const execution = await Execution.findById(executionId);

        if (!execution){
            return res.status(404).json({message: "Execution not found"});
        }

        res.status(200).json({execution});
    } catch (error) {
        console.error("error in getExecutionById controller:", error);

        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteExecution = async(req, res) => {
    const {executionId} = req.params;

    try {
        const execution = await Execution.findById(executionId);

        if (!execution){
            return res.status(404).json({message: "Execution not found"});
        }

        await execution.deleteOne();

        res.status(200).json({message: "Execution deleted successfully"});
    } catch (error) {
        console.error("error in deleteExecution controller:", error);

        res.status(500).json({message: "Internal server error"});
    }
}