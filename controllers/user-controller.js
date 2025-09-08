

module.exports.updateUser = async (req, res) => {
    let { name , currency, password } = req.body;
    const userId = req.userId;
    try {
        const updates = {};
        if (name) updates.name = name;
        if (currency) updates.currency = currency;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};