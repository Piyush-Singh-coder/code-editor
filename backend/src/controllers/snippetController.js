import Snippet from "../model/snippet.js";

export const addSnippet = async (req, res) => {
  const { title, code, language } = req.body;
  const user = req.user;
  try {
    if (!title || !code || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const snippet = new Snippet({
      user: user._id,
      title,
      language,
      code,
    });

    await snippet.save();

    res.status(200).json({ message: "Snippet added successfully" });
  } catch (error) {
    console.error("error in addSnippet controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });
    res.status(200).json({ snippets });
  } catch (error) {
    console.error("error in getSnippets controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSnippetById = async (req, res) => {
  const { snippetId } = req.params;

  try {
    const snippet = await Snippet.findById(snippetId)
      .populate("user", "fullName email")
      .populate("comments.user", "fullName email");

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.status(200).json({ snippet });
  } catch (error) {
    console.error("error in getSnippetById controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSnippet = async (req, res) => {
  const { snippetId } = req.params;
  const userId = req.user._id;
  try {
    const snippet = await Snippet.findById(snippetId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this snippet" });
    }

    await Snippet.findByIdAndDelete(snippetId);

    res.json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.error("error in deleteSnippet controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  const { snippetId } = req.params;
  const user = req.user;

  const { text } = req.body;

  try {
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const snippet = await Snippet.findById(snippetId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    snippet.comments.push({
      user: user._id,
      text,
    });

    await snippet.save();

    // Populate user for the new comment
    await snippet.populate("comments.user", "fullName email");

    res
      .status(200)
      .json({
        message: "Comment added successfully",
        comments: snippet.comments,
      });
  } catch (error) {
    console.error("error in addComment controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const star = async (req, res) => {
  const { snippetId } = req.params;
  const user = req.user;

  try {
    const snippet = await Snippet.findById(snippetId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.stars.includes(user._id)) {
      snippet.stars.pull(user._id);
      await snippet.save();
      return res.status(200).json({ message: "Star removed" });
    } else {
      snippet.stars.push(user._id);
      await snippet.save();
      return res.status(200).json({ message: "Star added" });
    }
  } catch (error) {
    console.error("error in addStar controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};
