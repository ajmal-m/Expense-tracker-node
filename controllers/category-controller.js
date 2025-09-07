const Category = require('../models/category-model');

module.exports.getCategories = async (req, res) => { 
    const userId = req.userId;
    try {
        const categories = await Category.find({ user: userId });
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.createCategory = async (req, res) => {
    const { name } = req.body;
    const userId = req.userId;
    try {
        const newCategory = new Category({ name , user: userId });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findOneAndDelete({ _id: id });
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};