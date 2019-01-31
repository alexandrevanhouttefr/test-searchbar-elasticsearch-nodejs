const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});

/**
 * Check of ElasticSearch
 */
client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('Elasticsearch cluster is down!');
    } else {
        console.log('ElasticSearch is ok!');
    }
})

/**
 * Creation of index
 */
client.indices.create({
    index: 'test-es-node'
}, function(error, response, status) {
    if (error) {
        console.log(error);
    } else {
        console.log("Created a new index", response)
    }
})

/**
 * Get JSON and add everything in ElasticSearch
 */
const cities = require('./cities.json');
var bulk = [];
cities.forEach(city => {
    bulk.push({index: {
            _index:"test-es-node",
            _type: "cities_list"
        }
    });
    bulk.push(city);
})
client.bulk({body:bulk}, function( err, response  ){
    if( err ){
        console.log("Failed Bulk operation", err)
    } else {
        console.log("Successfully imported %s", cities.length);
    }
});


