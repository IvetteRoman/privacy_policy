import { pool } from "../db.js";

export const getUser = async(req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const idString = id.toString();
        const [rows] = await pool.query("SELECT * FROM user WHERE id_sap = ?", [idString]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];
    
        res.json(user);

    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
}

export const verifyPolicy = async(req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const idString = id.toString();
        const [rows] = await pool.query("SELECT * FROM accept_policy WHERE id_user = ?", [idString]);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = rows[0];
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
}

export const register_accept_policy = async(req, res) => {
    try {
        const{id_policy, id_user} = req.body
        const time = Date.now();
        const date = new Date(time);
        const policy_accepted = true;
        const [rows] = await pool.query('INSERT INTO accept_policy (id_policy, id_user, date, policy_accepted) VALUES (?, ?, ?, ?)', [id_policy, id_user, date, policy_accepted])
        res.send({rows})
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
}

export const register_refuse_policy = async(req, res) => {
    try {
        const{id_policy, id_user} = req.body
        const time = Date.now();
        const date = new Date(time);
        const policy_accepted = false;
        const [rows] = await pool.query('INSERT INTO accept_policy (id_policy, id_user, date, policy_accepted) VALUES (?, ?, ?, ?)', [id_policy, id_user, date, policy_accepted])
        res.send({rows})
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
}



