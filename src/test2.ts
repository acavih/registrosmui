import mohair from "mohair";

const movieTable = mohair.table("movies");

const avatarQuery = movieTable.where({title: 'Avatar'})

console.log(avatarQuery.sql(), avatarQuery.params())
