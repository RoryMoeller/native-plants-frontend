
async function accessBackend(req, res) {

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
        const query_string = "INSERT INTO " + table_name + "(" + query_fields + ") VALUES (" + format_holders.join(" ") + ")/" + query_values.join(",");
        console.log("== query_string:", query_string);
        await fetchPostRes("https://native-plants-backend.herokuapp.com/i/" + query_string, {}).then(resBody => {
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
        


        /* console.log("== req.url:", req.url);
        console.log("== req.method:", req.method);
        console.log("== req.headers:", req.headers);
        console.log("== req.body:", req.body);
        console.log("== req.cookies:", req.cookies);
        console.log("== req.params:", req.params);
        console.log("== req.ip:", req.ip);
        console.log("== req.hostname:", req.hostname);
        console.log("== req.protocol:", req.protocol);
        console.log("== req.secure:", req.secure);
        console.log("== req.subdomains:", req.subdomains);
        console.log("== req.xhr:", req.xhr);
        console.log("== req.fresh:", req.fresh);
        console.log("== req.stale:", req.stale); */

        //res.status(200).send({success : true});
    }
}

export default accessBackend;
