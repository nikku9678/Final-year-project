import { MCQ } from "../models/mcqModel.js";

// Create MCQ (Admin only)
export const createMCQ = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    const { subject, topic, type, companyTag, level, question, options, correctOption, explanation } = req.body;

    // Validate required fields
    if (!subject || !topic || !type || !level || !question || !options || !correctOption || !explanation) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Create new MCQ
    const newMCQ = new MCQ({
      subject,
      topic,
      type,
      companyTag,
      level,
      question,
      options,
      correctOption,
      explanation,
    });

    await newMCQ.save();

    res.status(201).json({ success: true, message: "MCQ created successfully!", mcq: newMCQ });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const createMultipleMCQs = async (req, res) => {
  try {
      // Check if the authenticated user is an admin
      if (!req.user.isAdmin) {
          return res.status(403).json({ success: false, message: "Access denied. Admins only." });
      }

      const mcqs = req.body;

      // Validate input
      if (!Array.isArray(mcqs) || mcqs.length === 0) {
          return res.status(400).json({ success: false, message: "Please provide an array of MCQs." });
      }

      // Iterate over each MCQ and create them
      const createdMCQs = [];
      for (const mcq of mcqs) {
          const { subject, topic, type, companyTag, level, question, options, correctOption, explanation } = mcq;

          if (!subject || !topic || !type || !level || !question || !options || !correctOption || !explanation) {
              return res.status(400).json({ success: false, message: "All fields are required for each MCQ." });
          }

          const newMCQ = new MCQ({
              subject,
              topic,
              type,
              companyTag,
              level,
              question,
              options,
              correctOption,
              explanation,
          });

          await newMCQ.save();
          createdMCQs.push(newMCQ);
      }

      res.status(201).json({ success: true, message: "MCQs created successfully!", mcqs: createdMCQs });
  } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const getAllMCQs = async (req, res) => {
  try {
      // Retrieve all MCQs from the database
      const mcqs = await MCQ.find();

      if (!mcqs.length) {
          return res.status(404).json({ success: false, message: 'No MCQs found' });
      }

      res.status(200).json({ success: true,
        count:mcqs.length,
         message: 'MCQs retrieved successfully', mcqs });
  } catch (error) {
      console.error('Error retrieving MCQs:', error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
