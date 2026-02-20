import Execution from "../model/execution.js";
import axios from "axios";

export const execute = async (req, res) => {
  try {
    const { languageId, code, input } = req.body;

    if (!languageId || !code) {
      return res
        .status(400)
        .json({ message: "languageId and code are required" });
    }

    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        source_code: code,
        language_id: languageId,
        stdin: input || "",
      },
      {
        params: {
          base64_encoded: "false",
          wait: "true",
          fields: "stdout,stderr,compile_output,status,exit_code",
        },
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": process.env.JUDGE0_API_KEY,
          "x-rapidapi-host": process.env.JUDGE0_API_HOST,
        },
      },
    );

    const data = response.data;

    // Judge0 can return compile errors in compile_output, runtime errors in stderr
    const output = data.stdout || "";
    const error = data.compile_output || data.stderr || "";
    const statusDescription = data.status?.description || "";

    res.status(200).json({
      output,
      error,
      status: statusDescription,
      exitCode: data.exit_code,
    });
  } catch (error) {
    console.error("error in execute controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const saveExecution = async (req, res) => {
  const user = req.user;

  const { language, code, output } = req.body;

  try {
    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }
    if (!output) {
      return res.status(400).json({ message: "Output is required" });
    }

    const execution = new Execution({
      user: user._id,
      language,
      code,
      output,
    });

    await execution.save();

    res.status(200).json({ message: "Code is saved Successfully" });
  } catch (error) {
    console.error("error in saveExecution controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExecutions = async (req, res) => {
  const user = req.user;

  try {
    const executions = await Execution.find({ user: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ executions });
  } catch (error) {
    console.error("error in getExecutions controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExecutionById = async (req, res) => {
  const { executionId } = req.params;

  try {
    const execution = await Execution.findById(executionId);

    if (!execution) {
      return res.status(404).json({ message: "Execution not found" });
    }

    res.status(200).json({ execution });
  } catch (error) {
    console.error("error in getExecutionById controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExecution = async (req, res) => {
  const { executionId } = req.params;

  try {
    const execution = await Execution.findById(executionId);

    if (!execution) {
      return res.status(404).json({ message: "Execution not found" });
    }

    await execution.deleteOne();

    res.status(200).json({ message: "Execution deleted successfully" });
  } catch (error) {
    console.error("error in deleteExecution controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};
