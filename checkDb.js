require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const Product = require('./src/models/Product');
  const prods = await Product.find({ 
    $or: [
      { name: /Bourbon/i },
      { name: /Parle-G/i },
      { subcategory: /Sugar/i },
      { subcategory: /Jaggery/i }
    ]
  }, 'name category subcategory image');
  require('fs').writeFileSync('debugProds.json', JSON.stringify(prods, null, 2));
  mongoose.disconnect();
}).catch(console.error);
