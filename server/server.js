const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Server Work'));
app.use('/api/pdf', require('./pdf'));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`)); 