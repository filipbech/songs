const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  type Song {
    title: String
    author: String
    verse: String  
  }

  input SongInput {
    title: String
    author: String
    verse: String  
  }


  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type AddSongMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    song: Song
  }

  type Query {
    getSongs: [Song]
  }

  type Mutation {
    addSong(song: SongInput): AddSongMutationResponse
  }
`;

const songs = [
    {
      title: 'Lysets engel går med glans',
      author: 'B.S. Ingemann 1837',
      verse: `Lysets engel går med glans
      gennem himmelporte.
      For Guds engels strålekrans
      flygter alle nattens skygger sorte.
      
      Sol går over verden ud
      med Guds lys i øje:
      Se! Vor Herres sendebud
      går på gyldne skyer i det høje.
      
      Englen spreder over jord
      glansen fra Guds Himmel;
      i sin kåbes stråleflor
      favner han alverdens glade vrimmel.
      
      Sol ser ind i slot og vrå,
      ser på drot og tigger,
      ser til store, ser til små,
      kysser barnet, som i vuggen ligger.
      
      Os han også favne vil,
      englen i det høje;
      os han også smiler til,
      englen med Guds Himmel-glans i øje.
      
      Os har og vor Herre kær:
      ingen sjæl han glemmer;
      i hvert solglimt Gud er nær
      og vor glade morgensang fornemmer.`
    },
    {
      title: 'Nu ringer alle klokker mod sky',
      author: 'B.S. Ingemann 1837',
      verse: `Nu ringer alle klokker mod sky;
      det kimer i fjerne riger.
      Hver søndag morgen højt på ny
      stor glæde mod Himlen stiger.
      
      Det toner med lov og pris og bøn
      fra jord mod Paradis-haven:
      Det var en søndag morgen skøn,
      vor frelser stod op af graven.
      
      For os han i gravens dyb steg ned,
      han gik til de dødes rige.
      Til livet med stor herlighed
      han ville for os opstige.
      
      Al verdens glæde begravet lå;
      nu frydes vi alle dage:
      Den glæde, søndagssolen så,
      den har i verden ej mage.
      
      Der sad en engel på gravens sten
      blandt liljer i urtehaven;
      han peged med sin palmegren,
      hvor Jesus stod op af graven.
      
      Og der blev glæde på jorderig
      lig glæden i engles Himmel:
      Livskongen løfter op med sig
      til livet sin børnevrimmel.
      
      Guds børn skal holde med engle bøn
      med jubel i Paradis-haven.
      Det var en søndag morgen skøn,
      vor frelser stod op af graven.`
    },
  ];

const resolvers = {
    Query: {
        getSongs: () => {
          return songs.sort()
        },
    },
    Mutation: {
      addSong(_, {song}) {
        
        return  {
          code: "200",
          success: true,
          message: "Song was added",
          song
        }
      }
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}!`);
});