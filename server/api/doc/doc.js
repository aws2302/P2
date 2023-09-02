const router = require('express').Router();
// const { SwaggerUIBundle, SwaggerUIStandalonePreset } = require('swagger-ui-dist');
// const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();
// const spec = require('../../../Dokumentation/shorty-v1.0.yaml');

const fs = require('fs');
const YAML = require('yaml');
const file = fs.readFileSync('../Dokumentation/shorty-v1.0.yaml', 'utf-8');
const spec = YAML.parse(file);

const swaggerUi = require('swagger-ui-express');

router.use(
  '/api',
  swaggerUi.serve, swaggerUi.setup(spec));
// router.get('/api', swaggerUi.setup('../../../Dokumentation/shorty-v1.0.yaml'));

module.exports = router;
