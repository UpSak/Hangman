import express from 'express';

const approg = express();
approg.use(express.static('client'));
approg.listen(8080);
