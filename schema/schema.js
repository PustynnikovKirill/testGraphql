const graphql = require('graphql')
// const {GraphQLSchema} = require("graphql");

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID,GraphQLInt} = graphql

const movies = [
    {id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId:'1'},
    {id: '2', name: '1984', genre: 'Sci-Fi', directorId:'2'},
    {id: '3', name: 'V for vendetta', genre: 'Crime', directorId:'3'},
    {id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId:'4'},
]

const directors = [
    {id:'1', name:'QUENTIN',age:55},
    {id:'2', name:'Michael',age:72},
    {id:'3', name:'McTeigue',age:51},
    {id:'4', name:'Gui Ritchie',age:40},

]
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director:{
            type:DirectorType,
            resolve(parent,args){
                return directors.find(director =>director.id === parent.id)
            }
        }
    })
})
const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLString}},
            resolve(parents, args) {
                return movies.find(movie =>movie.id === args.id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLString}},
            resolve(parents, args) {
                return directors.find(director =>director.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
})