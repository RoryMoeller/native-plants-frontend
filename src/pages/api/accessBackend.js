import { getSession } from "next-auth/react"

async function accessBackend(req, res) {
    const session = await getSession({ req })
    console.log("== Session:", session)
    console.log("req:", req)

     if (!session) {
        res.status(401).send("You are not logged in!");
        return;
    }else {
        console.log("== Logged in with these credentials:", session.user.username, session.user.password);
    } 

    async function fetchPostRes(url, body) {
        console.log("Fetching from " + url);
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
                'Accept-Encoding': 'gzip, deflate, br',
                "Connection": "keep-alive"
            },
            body: JSON.stringify(body)                
        });
        console.log(res);
        const resBody = await res.json();
        console.log(resBody);
        return resBody;
    }

    async function fetchGetRes(url) {
        console.log("Fetching from " + url);
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
                'Accept-Encoding': 'gzip, deflate, br',
                "Connection": "keep-alive"
            }
        });
        const resBody = await res.json();
//        console.log(resBody);
        return resBody;
    }

    if (req.method === "POST") {
        console.log("query_values:", req.body.query_values);
        const table_name = "rev2." + req.body.table_name;
        const query_type = req.body.query_type;
        if (query_type !== "INSERT") {
            res.status(405).send({ err: "Only INSERT queries supported" })
        }
        const query_fields = req.body.query_fields.join(", ");
        const query_values = req.body.query_values;
        const format_holders = req.body.query_fields.map(_x => `%s`);
        const query_string = "INSERT INTO " + table_name + "(" + query_fields + ") VALUES (" + format_holders.join(", ") + ")/" + query_values.join(",");
        console.log("== query_string:", query_string);
        await fetch("https://native-plants-backend.herokuapp.com/wake_me_up", {
            method: "GET",
            headers: {
                "Connection": "keep-alive"
            }
        }).then(() => {console.log(`ready to push ${query_string} to backend`)});
        await fetchGetRes("https://native-plants-backend.herokuapp.com/ig/" + query_string).then(resBody => {
            console.log("== resBody:", resBody);
            res.status(200).send({
                msg: "OK!"
            });
        }).catch(err => {
            console.log("== err:", err);
            res.status(500).send({
                err: "Error accessing backend"
            });
        });
        // res.status(501).send({ err: "Something went wrong" });
    } else if (req.method == "GET") {
        console.log("== req.query:", req.query);
        console.log("TYPE:", typeof(req.query.query_string))
        if (req.query.query_string.substring(0, 6) === "SELECT" && !req.query.query_string.includes("*")) {
            var fin_fields = []
            var fields = req.query.query_string.substring(req.query.query_string.indexOf("FROM"), 8 + req.query.query_string.indexOf("WHERE")).split(",");
            fields.map((field) => {
                field = field.trim() + " AS \"" + (field.trim()).split("_").map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join(" ") + "\"";
                fin_fields.push(field)
            })
            console.log(fin_fields)
            fin_fields = fin_fields.join(", ")
            req.query.query_string = req.query.query_string.substring(0, 6) + " " + fin_fields + " " + req.query.query_string.substring(req.query.query_string.indexOf("FROM"), );
            console.log(req.query.query_string)
        }
        await fetchGetRes("https://native-plants-backend.herokuapp.com/q/" + req.query.query_string).then(resBody => {
//            console.log("== resBody:", resBody);
            res.status(200).send({
                msg: "OK!",
                data: resBody
            });
        }).catch(err => {
            console.log("== err:", err);
            res.status(500).send({
                err: "Error accessing backend"
            });
        });
        


    } else if (req.method === "DELETE") {
        console.log("query_values:", req.body.query_values);
        const table_name = "rev2." + req.body.table_name;
        const query_type = req.body.query_type;
        if (query_type !== "DELETE") {
            res.status(405).send({ err: "Only DELETE queries supported" })
        }
        const query_fields = req.body.query_fields.join(", ");

        const query_values = req.body.query_values;
        const format_holders = req.body.query_fields.map(_x => `%s`);
        const query_string = "DELETE FROM " + table_name + ` WHERE ${query_fields}=%s/` + query_values[0];
        console.log("== query_string:", query_string);
        await fetch("https://native-plants-backend.herokuapp.com/wake_me_up", {
            method: "GET",
            headers: {
                "Connection": "keep-alive"
            }
        }).then(() => {console.log(`ready to push ${query_string} to backend`)});
        await fetchGetRes("https://native-plants-backend.herokuapp.com/ig/" + query_string).then(resBody => {
            console.log("== resBody:", resBody);
            res.status(200).send({
                msg: "OK!"
            });
        }).catch(err => {
            console.log("== err:", err);
            res.status(500).send({
                err: "Error accessing backend"
            });
        });
        // res.status(501).send({ err: "Something went wrong" });
    } else if (req.method === "PATCH") {
        console.log("query_values:", req.body.query_values);
        const table_name = "rev2." + req.body.table_name;
        const query_type = req.body.query_type;
        if (query_type !== "UPDATE") {
            res.status(405).send({ err: "Only UPDATE queries supported" })
        }
        const query_fields = req.body.query_fields;

        const query_values = req.body.query_values;
        const format_holders = req.body.query_fields.map(_x => `%s`);
        const query_string = "UPDATE " + table_name + ` SET ${query_fields[0]}=%s WHERE ${query_fields[1]}=%s/` + query_values.join(",");
        console.log("== query_string:", query_string);
        await fetch("https://native-plants-backend.herokuapp.com/wake_me_up", {
            method: "GET",
            headers: {
                "Connection": "keep-alive"
            }
        }).then(() => {console.log(`ready to push ${query_string} to backend`)});
        await fetchGetRes("https://native-plants-backend.herokuapp.com/ig/" + query_string).then(resBody => {
            console.log("== resBody:", resBody);
            res.status(200).send({
                msg: "OK!"
            });
        }).catch(err => {
            console.log("== err:", err);
            res.status(500).send({
                err: "Error accessing backend"
            });
        });
        // res.status(501).send({ err: "Something went wrong" });
    }
}

export default accessBackend;
