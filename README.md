# Pins app backend

[Front-end here](https://github.com/JeanCarrillo/pins-app)

- Node + Express + Typescript + MongoDB (mongoose)
- JWT authentication
- Multer to save uploaded static assets
- Stripe to handle pay requests

##### Run :

```
npm i
npm start
```

##### .env should contain :

PORT
MONGO_LOGIN
MONGO_PW
MONGO_CLUSTER_URL
DB_NAME
STRIPE_SECRET_KEY
JWT_SECRET
