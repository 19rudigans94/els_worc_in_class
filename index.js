import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const port = 3010;
const domain = "localhost";

const createPath = (page) => {
    return path.resolve(), "views", `${page}.ejs`;
};

// middleware start //
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});
app.use('/assets', express.static("assets"));
/////////////////////

// routes start //

app.get("/", (req, res) => {
    const title = "Home";
    res.render(createPath("main"), { title });
});

app.get("/about", (req, res) => {
    const title = "About";
    fs.readFile("bd/users.json", "utf-8", (err, data) => {
        const users = JSON.parse(data);
        res.render(createPath("about_us"), { title, users: [...users] });
    });
});

app.get("/contact", (req, res) => {
    const title = "Contact";
    res.render(createPath("contact"), { title });
});


app.get("/login", (req, res) => {
    const title = "Добавить пользователя";
    res.render(createPath("login"), { title });
});

app.get("*", (req, res) => {
    res.render(createPath("404"));
});

const arr = fs.readFileSync("bd/users.json", "utf-8");
const users = JSON.parse(arr);

app.post("/login", (req, res) => {
    const title = "About";
    let id = users.length;
    const { username, lastname, age, email, address } = req.body;
    const user = {
        id,
        username,
        lastname,
        age,
        email,
        address
    };

    users.push(user);
    fs.writeFileSync("bd/users.json", JSON.stringify(users, null, 4));
    res.render(createPath("about_us"), { title, users: [...users] });
});

// routes end //


app.listen(port, () => {
    console.log(`Server running at http://${domain}:${port}`);
});