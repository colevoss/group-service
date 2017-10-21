module.exports.db = () => ({
  uri:
    'mongodb://adio:adio@cluster0-shard-00-00-ukyao.mongodb.net:27017,cluster0-shard-00-01-ukyao.mongodb.net:27017,cluster0-shard-00-02-ukyao.mongodb.net:27017',
  name: 'adio-groups',
  params: 'ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
});
