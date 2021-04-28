const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const port = 8080;



const users = [
    {
        id: '1',
        status: "Working",
        username: "Mr. Jackson",
        photo: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: '2',
        status: "BusinessTrip",
        username: "Ms. Jackson",
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: '3',
        status: "LunchTime",
        username: "Jackson Junior",
        photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: '4',
        status: "OnVacation",
        username: "Jackson Junior the III",
        photo: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: '5',
        status: "OnVacation",
        username: "Jackson Five",
        photo: 'https://images.unsplash.com/photo-1494708001911-679f5d15a946?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
];


app.get("/users", (req, res) => {
    res.json({ users });
});


app.put("/users", (req, res) => {
    const user = users.find(u => u.id === req.body.userId);

    const success = 'updated successfully'
    const error = 'update failed'

    if (user !== undefined) {
        user.status = req.body.status;
        res.json({ message: success });
    } else {
        res.statusCode = 404;
        res.json({ message: error });
    }
});

app.post('/users/create', (req, res) => {
    const success = 'created successfully'

    const defaultPhoto = 'https://java-master.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'

    const { status, username } = req.body

    let lastId = users[users.length - 1].id
    lastId = parseInt(lastId, 10)

    let newEmployeeId = lastId + 1

    let newEmployee = {
        id: newEmployeeId.toString(),
        status: status,
        username: username,
        photo: defaultPhoto
    }

    if (!!status && !!username) {
        users.push(newEmployee)
        res.json({ message: success });
    } else {
        res.statusCode = 400;
        let errorMessage = {}
        if (!status) {
            errorMessage = { ...errorMessage, status: 'Status requered' }
        }
        if (!username) {
            errorMessage = { ...errorMessage, status: 'User name requered' }
        }
        res.json(errorMessage);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));