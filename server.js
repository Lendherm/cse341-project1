const { initDb } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

app.use('/contacts', contactsRoutes);

initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
