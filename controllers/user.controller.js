import User from "../models/user.model.js";
import List from "../models/list.model.js";
import csv from 'csv-parser';
import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import { sendEmail } from "../utlis/email.util.js";

const unlinkAsync = promisify(fs.unlink);

const upload = multer({ dest: 'uploads/' });
const uploadCSV = upload.single('file');

const addUserFromCSV = async (req, res) => {
    const results = [];
    const createdUsers = [];
    const errors = [];
    let totalCount = 0;

    try {
        const listId = req.params.listId;
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        await new Promise((resolve, reject) => {
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('error', reject)
                .on('end', resolve);
        });

        for (const row of results) {
            try {
                const properties = {};

                for (const prop of list.customProperties) {
                    properties[prop.title] = row[prop.title] || prop.defaultValue;
                }

                const user = new User({
                    name: row.name,
                    email: row.email,
                    listId,
                    properties,
                });

                const newUser = await user.save();
                if (!newUser)
                    throw new Error("Error in creating user");

                totalCount++;
                createdUsers.push(newUser);
            } catch (error) {
                if (error.code === 11000) {
                    // Duplicate key error
                    console.error("Duplicate email error:", error);
                    errors.push({ row, error: "Duplicate email" });
                } else {
                    console.error("Error creating user:", error);
                    errors.push({ row, error: error.message });
                }
            }
        }

        // Cleanup the uploaded file
        await unlinkAsync(req.file.path);

        return res.status(200).json({
            message: "Successfully added users from CSV",
            totalCount,
            errors,
            users: createdUsers,
        });

    } catch (error) {
        console.error(error);
        if (req.file) {
            // Ensure the file is deleted if an error occurs
            await unlinkAsync(req.file.path);
        }
        res.status(500).json({ error: "Error in adding user from CSV" });
    }
};


const userUnsbscribe = async (req, res) => {
    try {

        const listId = req.params.listId;
        const userId = req.params.userId;

        if (!listId || !userId)
            throw new Error("List ID and user ID are required");

        const user = await User.findOne({ _id: userId, listId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.unsubscribed = true;
        await user.save();

        res.status(200).json({ message: 'User unsubscribed successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error in unsubscribing user" })
    }
}

const sendEmailToList = async (req, res) => {
    const listId = req.params.listId;
    if (!listId) {
        return res.status(400).json({ error: 'List ID is required' });
    }
    const { subject, body } = req.body;
    if (!subject || !body) {
        return res.status(400).json({ error: 'Subject and body are required' });
    }

    try {
        
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        const users = await User.find({ listId, unsubscribed: false });

        for (const user of users) {
            const personalizedBody = body.replace(/\[([^\]]+)\]/g, (_, propName) => user.properties.get(propName) || '');
            await sendEmail(user.email, subject, personalizedBody, listId, user._id);
        }

        res.status(200).json({ "Message": 'Emails sent successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ "Error": "Error in sending mail , try again" });
    }
}

export {
    uploadCSV,
    addUserFromCSV,
    userUnsbscribe,
    sendEmailToList
};
