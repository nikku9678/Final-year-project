import {Discussion} from '../models/discussion.js';
import {Comment} from '../models/comment.js';

// Create a new discussion
export const createDiscussion = async (req, res) => {
    try {
        const { userId, title, content, examDate } = req.body;
        const discussion = new Discussion({ userId, title, content, examDate });
        await discussion.save();
        res.status(201).json({ success: true, message: 'Discussion created successfully', discussion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create discussion', error: error.message });
    }
};

// Get all discussions
export const getAllDiscussions = async (req, res) => {
  console.log("hello")
    try {
        const discussions = await Discussion.find()
            .populate('userId', 'name')
            .populate({
                path: 'comments',
                populate: { path: 'userId', select: 'name' },
            });
        res.status(200).json({ success: true, 
            count: discussions.length,
            discussions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch discussions', error: error.message });
    }
};

// Like a discussion
export const likeDiscussion = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const userId = req.body.userId;

        const discussion = await Discussion.findById(discussionId);
        if (!discussion) return res.status(404).json({ success: false, message: 'Discussion not found' });

        if (discussion.likes.includes(userId)) {
            return res.status(400).json({ success: false, message: 'You have already liked this discussion' });
        }

        discussion.likes.push(userId);
        await discussion.save();

        res.status(200).json({ success: true, message: 'Discussion liked successfully', discussion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to like discussion', error: error.message });
    }
};

// Add a comment to a discussion
export const addComment = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const { userId, content } = req.body;

        const discussion = await Discussion.findById(discussionId);
        if (!discussion) return res.status(404).json({ success: false, message: 'Discussion not found' });

        const comment = new Comment({ userId, discussionId, content });
        await comment.save();

        discussion.comments.push(comment._id);
        await discussion.save();

        res.status(201).json({ success: true, message: 'Comment added successfully', comment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add comment', error: error.message });
    }
};

// Delete a discussion
export const deleteDiscussion = async (req, res) => {
    try {
        const { discussionId } = req.params;

        const discussion = await Discussion.findByIdAndDelete(discussionId);
        if (!discussion) return res.status(404).json({ success: false, message: 'Discussion not found' });

        // Delete associated comments
        await Comment.deleteMany({ discussionId });

        res.status(200).json({ success: true, message: 'Discussion and its comments deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete discussion', error: error.message });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const { discussionId } = req.params;

        // Find all comments for the given discussionId and populate userId to get user details
        const comments = await Comment.find({ discussionId })
            .populate('userId', 'name email') // Adjust fields as needed
            .sort({ createdAt: -1 }); // Optional: Sort by newest first

        if (!comments || comments.length === 0) {
            return res.status(404).json({ success: false, message: 'No comments found for this discussion' });
        }

        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch comments', error: error.message });
    }
};
