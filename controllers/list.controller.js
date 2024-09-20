import User from "../models/user.model.js"
import List from "../models/list.model.js"

const createList = async (req, res) => {
    try {

        const { title, customProperties } = req.body;
        if (!title || !customProperties)
            throw new Error("Title and customProperties are required");

        console.log(title, customProperties)

        const list = new List({ title: title, customProperties: customProperties });
        const newList = await list.save();
        if (!newList)
            throw new Error("Error in creating list try again")

        res.status(200).json({ "Message": "List created sucesfully", listDetails: newList })

    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "Error in creating new list" })
    }
}

export {
    createList
}