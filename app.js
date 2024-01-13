const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Include routes for dealers and painters
const dealerRoutes = require('./routes/dealerRoutes');
const painterRoutes = require('./routes/painterRoutes');

app.use('/dealers', dealerRoutes);
app.use('/painters', painterRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
